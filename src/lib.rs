use std::time::Duration;

use oauth2::{
    AuthorizationCode, CsrfToken, PkceCodeChallenge, PkceCodeVerifier, RefreshToken, Scope,
    TokenResponse, reqwest,
};
use serde::{Deserialize, Serialize};
use serde_json;
use worker::*;
mod auth;
mod websocket;

#[derive(Serialize, Deserialize, Debug)]
struct Message {
    username: String,
    game: String,
    avatar: String,
    url: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Callback {
    code: AuthorizationCode,
    state: CsrfToken,
}

#[derive(Serialize, Deserialize, Debug)]
struct Refresh {
    refresh_token: RefreshToken,
}

#[event(fetch, respond_with_errors)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    let router = Router::new();

    router
        .get_async("/", |_, _| async { Response::ok("Shoutout!") })
        .get_async("/version", |_, _| async {
            const VERSION: &str = env!("CARGO_PKG_VERSION");
            const HOMEPAGE: &str = "https://github.com/joseafga/shoutout";

            Response::ok(format!("Version: {VERSION}\nHomepage: {HOMEPAGE}"))
        })
        .get_async("/kick/:user", shoutout_kick)
        .get_async("/ws", ws_handler)
        .get_async("/oauth2/kick/login", oauth2_login)
        .get_async("/oauth2/kick/callback", oauth2_callback)
        .get_async("/oauth2/kick/refresh", oauth2_refresh)
        .run(req, env)
        .await
}

async fn shoutout_kick(req: Request, ctx: RouteContext<()>) -> worker::Result<Response> {
    if let Some(user) = ctx.param("user") {
        let username = user.strip_prefix('@').unwrap_or(user).trim().to_lowercase(); // sanitize username

        let message = Message {
            username: username.to_string(),
            game: "TODO:game".to_string(),
            avatar: "TODO:avatar".to_string(),
            url: "kick.com/".to_string(),
        };

        // Use a internal request to Durable Object
        let mut url = req.url()?;
        let mut req_init = RequestInit::new();
        url.set_path("/internal/send");
        req_init.with_method(Method::Post);
        req_init.with_body(Some(serde_json::to_string(&message).unwrap().into()));

        let req_internal = Request::new_with_init(&url.to_string(), &req_init)?;

        // Durable Object
        let namespace = ctx.durable_object("SHOUTOUT_HUB")?;
        let stub = namespace.id_from_name("main")?.get_stub()?;

        // Send message to Durable Object
        // All websocket clients will receive the message
        let _ = stub.fetch_with_request(req_internal).await;

        // Return text for command
        let response = format!(
            "Conheça o canal de {} que estava streamando {}! 💚 Acesse: https://kick.com/{}",
            message.username, message.game, message.username
        );

        return Response::ok(response);
    }

    Response::error("Bad Request", 400)
}

async fn ws_handler(req: Request, ctx: RouteContext<()>) -> worker::Result<Response> {
    let upgrade_header = match req.headers().get("Upgrade") {
        Ok(upgrade) => upgrade.unwrap().to_string(),
        Err(_) => "".to_string(),
    };

    if upgrade_header != "websocket" {
        return worker::Response::error("Expected Upgrade: websocket", 426);
    }

    // Durable Object
    let namespace = ctx.durable_object("SHOUTOUT_HUB")?;
    let stub = namespace.id_from_name("main")?.get_stub()?;

    stub.fetch_with_request(req).await
}

// response_type=code&
// client_id=<your_client_id>&
// redirect_uri=<https://yourapp.com/callback>&
// scope=<scopes>&
// code_challenge=<code_challenge>&
// code_challenge_method=S256&
// state=<random_value>
async fn oauth2_login(_: Request, ctx: RouteContext<()>) -> worker::Result<Response> {
    let client = auth::client_setup(&ctx).await.unwrap();

    // Generate a PKCE challenge.
    let (pkce_challenge, pkce_verifier) = PkceCodeChallenge::new_random_sha256();

    // Generate the full authorization URL.
    let (auth_url, csrf_token) = client
        .authorize_url(CsrfToken::new_random)
        // Set the desired scopes.
        .add_scope(Scope::new("user:read".to_string()))
        .add_scope(Scope::new("channel:read".to_string()))
        // Set the PKCE code challenge.
        .set_pkce_challenge(pkce_challenge)
        .url();

    // Store current login state
    let key = format!("tmp:kick:{}", csrf_token.secret());
    ctx.kv("shoutout")?
        .put(key.as_str(), pkce_verifier.secret())?
        .expiration_ttl(600) // 10 minutes
        .execute()
        .await?;

    Response::redirect(auth_url)
}

// ?code=AAA&state=XYZ
async fn oauth2_callback(req: Request, ctx: RouteContext<()>) -> worker::Result<Response> {
    let query: Callback = match req.query() {
        Ok(q) => q,
        Err(_) => return Response::error("Bad Request", 400),
    };

    // Restore login data
    let kv = ctx.kv("shoutout")?;
    let key = format!("tmp:kick:{}", query.state.secret());
    let pkce_verifier = match kv.get(key.as_str()).text().await? {
        Some(value) => {
            console_debug!("KV key has found {}: {}", key, value);
            PkceCodeVerifier::new(value)
        }
        None => return Response::error("CSRF Token invalid or expired", 400),
    };

    // Validate code with kick
    let client = auth::client_setup(&ctx).await.unwrap();
    let token_result = client
        .exchange_code(query.code)
        // Set the PKCE code verifier.
        .set_pkce_verifier(pkce_verifier)
        .request_async(&reqwest::Client::new())
        .await;

    match token_result {
        // TODO: not wrinting to KV temporary
        // require better flow to request
        Ok(token) => Response::ok(format!(
            "Token: {} {}\nRefresh Token: {}\nExpires in {} seconds\nScopes: {:?}",
            token.token_type().as_ref().to_string(),
            token.access_token().secret(),
            token.refresh_token().unwrap().secret(),
            token.expires_in().unwrap_or(Duration::ZERO).as_secs(),
            token.scopes()
        )),
        Err(_) => return Response::error("Token creation failed", 500),
    }
}

// refresh_token (string): Code received during the Authorization Flow
// client_id (string): Your application's client ID
// client_secret (string): Your application's client secret
// grant_type (string): refresh_token
async fn oauth2_refresh(req: Request, ctx: RouteContext<()>) -> worker::Result<Response> {
    let query: Refresh = match req.query() {
        Ok(q) => q,
        Err(_) => return Response::error("Bad Request", 400),
    };

    let client = auth::client_setup(&ctx).await.unwrap();
    let token_result = client
        .exchange_refresh_token(&query.refresh_token)
        .request_async(&reqwest::Client::new())
        .await;

    match token_result {
        // TODO: not wrinting to KV temporary
        // require better flow to request
        Ok(token) => Response::ok(format!(
            "Token: {} {}\nRefresh Token: {}\nExpires in {} seconds\nScopes: {:?}",
            token.token_type().as_ref().to_string(),
            token.access_token().secret(),
            token.refresh_token().unwrap().secret(),
            token.expires_in().unwrap_or(Duration::ZERO).as_secs(),
            token.scopes()
        )),
        Err(_) => return Response::error("Token creation failed", 500),
    }
}
