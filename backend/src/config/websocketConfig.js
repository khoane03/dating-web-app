import { WebSocketServer } from 'ws';
import { saveMess } from '../service/chatService.js';

const users = new Map();

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', async (data) => {
      try {
        const parsedData = JSON.parse(data);
        const type = parsedData.type;

        switch (type) {

          case 'join':
            const userId = parsedData.userId;
            if (!userId) {
              throw new Error('User ID is missing in join message');
            }
            users.set(userId, ws);
            ws.userId = userId;
            console.log(`User ${userId} joined`);
            break;

          case 'sendMessage':

            const messageData = parsedData.data;
            if (!messageData) {
              throw new Error('Message data is missing');
            }
            const { sender_id, receiver_id, message } = messageData;

            // Lưu tin nhắn vào CSDL
            const savedMessage = await saveMess(sender_id, receiver_id, message);
            
            // Gửi tin nhắn đến người nhận
            const receiverWs = users.get(Number(receiver_id));
            if (receiverWs) {
              receiverWs.send(
                JSON.stringify({
                  type: 'receiveMessage',
                  data: savedMessage,
                })
              );
            }

            // Gửi lại tin nhắn cho người gửi (để xác nhận)
            ws.send(
              JSON.stringify({
                type: 'receiveMessage',
                data: savedMessage,
              })
            );
            break;

          default:
            console.log('Unknown message type:', type);
        }
      } catch (error) {
        console.error('WebSocket error:', error);
        ws.send(
          JSON.stringify({
            type: 'error',
            data: { message: 'Failed to process message', error: error.message },
          })
        );
      }
    });

    ws.on('close', () => {
      console.log('User disconnected');
      users.forEach((value, key) => {
        if (value === ws) users.delete(key);
      });
      console.log('users online:', users.size);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return wss;
};