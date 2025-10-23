use worker::*;

#[durable_object(websocket)]
pub struct ShoutoutHub {
    state: State,
}

impl DurableObject for ShoutoutHub {
    fn new(state: State, _env: Env) -> Self {
        Self { state }
    }

    async fn fetch(&self, mut req: Request) -> Result<Response> {
        let path = req.path();

        if path == "/ws" {
            // Already expected Upgrade header, so dont need double check
            let pair = WebSocketPair::new()?;
            self.state.accept_web_socket(&pair.server); // Save websocket server

            Response::from_websocket(pair.client)
        } else if path == "/internal/send" {
            let message = req.text().await?;

            let websockets = self.state.get_websockets(); // Get all active WebSocket connections

            // Broadcast message to all connected clients
            for (index, ws) in websockets.iter().enumerate() {
                console_log!("Sending message to client n{}", index);
                ws.send_with_str(&message)?;
            }

            Response::ok("Success")
        } else {
            Response::error("Not Found", 404)
        }
    }

    async fn websocket_message(
        &self,
        ws: WebSocket,
        message: WebSocketIncomingMessage,
    ) -> Result<()> {
        if let WebSocketIncomingMessage::String(text) = message
            && text.eq("ping")
        {
            ws.send_with_str("pong")?;
        }

        Ok(())
    }

    async fn websocket_close(
        &self,
        _ws: WebSocket,
        code: usize,
        reason: String,
        _was_clean: bool,
    ) -> Result<()> {
        let id = self.state.id();
        console_debug!("Closed {id} - code: {code} - reason: {reason}");

        Ok(())
    }

    async fn websocket_error(&self, _ws: WebSocket, error: Error) -> Result<()> {
        let id = self.state.id();
        console_debug!("Error {id} - message: {error}");

        Ok(())
    }
}
