use oauth2::basic::{
    BasicClient, BasicErrorResponse, BasicRevocationErrorResponse, BasicTokenIntrospectionResponse,
    BasicTokenResponse,
};
use oauth2::url::ParseError;
use oauth2::{
    AuthType, AuthUrl, Client, ClientId, ClientSecret, EndpointNotSet, EndpointSet, RedirectUrl,
    StandardRevocableToken, TokenUrl,
};
use worker::RouteContext;

pub type SetupClient = Client<
    BasicErrorResponse,
    BasicTokenResponse,
    BasicTokenIntrospectionResponse,
    StandardRevocableToken,
    BasicRevocationErrorResponse,
    EndpointSet,
    EndpointNotSet,
    EndpointNotSet,
    EndpointNotSet,
    EndpointSet,
>;

pub async fn client_setup(ctx: &RouteContext<()>) -> Result<SetupClient, ParseError> {
    let client_id = ClientId::new(
        ctx.secret("CLIENT_ID")
            .expect("Missing the CLIENT_ID environment variable.")
            .to_string(),
    );
    let client_secret = ClientSecret::new(
        ctx.secret("CLIENT_SECRET")
            .expect("Missing the CLIENT_SECRET environment variable.")
            .to_string(),
    );
    let auth_server_auth_url = AuthUrl::new("https://id.kick.com/oauth/authorize".to_string())?;
    let auth_server_token_url = TokenUrl::new("https://id.kick.com/oauth/token".to_string())?;
    // let auth_server_token_url = TokenUrl::new("http://localhost:5000".to_string())?;
    let redirect_uri = RedirectUrl::new(
        ctx.var("CALLBACK")
            .expect("Missing the CALLBACK environment variable.")
            .to_string(),
    )?;

    // Create an OAuth2 client by specifying the client ID, client secret, authorization URL and
    // token URL.
    let client = BasicClient::new(client_id)
        .set_auth_type(AuthType::RequestBody)
        .set_client_secret(client_secret)
        .set_auth_uri(auth_server_auth_url)
        .set_token_uri(auth_server_token_url)
        .set_redirect_uri(redirect_uri);

    Ok(client)
}
