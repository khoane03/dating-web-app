import { saveMess, getMess } from "../service/chatService.js";
import apiResponse from "../utils/apiResponse.js";
import WebSocket from 'ws';

export const addMess = async (req, res) => {
  const { id } = req.user;
  const { receiver_id, message } = req.body;
  const response = await saveMess(id, receiver_id, message);
  return apiResponse(res, 200, response.message, response.data);
}
const clients = new Map();
export const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const userId = Number(new URL(req.url, "http://localhost").searchParams.get("userId"));
    if (!userId) {
      ws.close();
      return;
    }

    clients.set(userId, ws);

    ws.on("message", async (message) => {
      try {
        const { senderId, receiverId, content } = JSON.parse(message);
        const savedMessage = await saveMessage(senderId, receiverId, content);

        // Gửi tin nhắn cho người nhận nếu họ đang online
        const receiverSocket = clients.get(receiverId);
        if (receiverSocket) {
          receiverSocket.send(JSON.stringify(savedMessage));
        }
      } catch (error) {
        console.error("Message error:", error);
      }
    });

    ws.on("close", () => {
      clients.delete(userId);
    });
  });
};

export const getMess = async (req, res) => {
  const { id } = req.user;
  const { receiver_id} = req.query;
  const response = await getMess(id, receiver_id);
  return apiResponse(res, response.code, response.message, response.data);
}