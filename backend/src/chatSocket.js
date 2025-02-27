const WebSocket = require("ws");
const pool = require("../config/db");

const chatSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", async (message) => {
      const { chatId, senderId, text } = JSON.parse(message);

      // Lưu tin nhắn vào database
      const result = await pool.query(
        "INSERT INTO messages (chat_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *",
        [chatId, senderId, text]
      );
      const newMessage = result.rows[0];

      // Gửi tin nhắn đến tất cả client
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newMessage));
        }
      });
    });

    ws.on("close", () => console.log("Client disconnected"));
  });
};

module.exports = chatSocket;
