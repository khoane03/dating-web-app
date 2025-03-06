import { saveMessage } from "../service/chatService.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", (userId) => {
      socket.join(userId.toString());
    });

    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
      await saveMessage(senderId, receiverId, message);
      io.to(receiverId.toString()).emit("receiveMessage", { senderId, message });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
