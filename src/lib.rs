use oauth2::{
    AuthorizationCode, CsrfToken, PkceCodeChallenge, PkceCodeVerifier, Scope, TokenResponse,
    reqwest,
};
use serde::{Deserialize, Serialize};
use serde_json;
use worker::*;
use worker_kv::KvError;
mod auth;

#[derive(Serialize, Deserialize, Debug)]
struct Callback {
    code: AuthorizationCode,
    state: CsrfToken,
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
        .get("/kick/:user", |_req, ctx| {
            if let Some(user) = ctx.param("user") {
                // let state = state.clone();
                let channel = "TODO:channel";
                let game = "TODO:game";

                return Response::ok(format!("Conheça o canal de {channel} que estava streamando {game}! 💚 Acesse: https://kick.com/{channel}"));
            }

            Response::error("Bad Request", 400)
        })
        .get_async("/oauth2/kick/login", oauth2_login)
        .get_async("/oauth2/kick/callback", oauth2_callback)
        .run(req, env)
        .await
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
    let key = format!("token:kick:{}", csrf_token.secret());
    ctx.kv("shoutout")?
        .put(key.as_str(), pkce_verifier.secret())?
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
    let key = format!("token:kick:{}", query.state.secret());
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
        Ok(token) => {
            kv.put("token", token.access_token().secret())?
                .execute()
                .await?;
        }
        Err(_) => return Response::error("Token creation failed", 500),
    }

    Response::ok("Token successfully created!")
}
