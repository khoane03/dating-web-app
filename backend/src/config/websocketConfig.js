import { WebSocketServer } from 'ws';
import { saveMess } from '../service/chatService.js';

const users = new Map();

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    console.log('User connected via WebSocket');

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);

        switch (message.type) {
          case 'join':
            const userId = message.userId;
            users.set(userId, ws);
            ws.userId = userId;
            console.log(`User ${userId} joined`);
            break;

          case 'sendMessage':
            const { sender_id, receiver_id, message } = message.data;
            const savedMessage = await saveMess(sender_id, receiver_id, message);

            const receiverWs = users.get(receiver_id);
            if (receiverWs) {
              receiverWs.send(
                JSON.stringify({
                  type: 'receiveMessage',
                  data: savedMessage,
                })
              );
            }

            ws.send(
              JSON.stringify({
                type: 'receiveMessage',
                data: savedMessage,
              })
            );
            break;

          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
        ws.send(
          JSON.stringify({
            type: 'error',
            data: { message: 'Failed to process message' },
          })
        );
      }
    });

    ws.on('close', () => {
      console.log('User disconnected');
      users.forEach((value, key) => {
        if (value === ws) users.delete(key);
      });
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return wss;
};