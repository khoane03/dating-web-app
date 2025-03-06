import express from "express";
import { authRouter } from "./router/authRouter.js";
import { chatRouter } from "./router/chatRouter.js";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./utils/socket.js";

const app = express();
const server = http.createServer(app); // Tạo HTTP server

app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/chat", chatRouter);

// Thiết lập WebSocket
const io = new Server(server, {
  cors: { origin: "*" },
});
setupSocket(io);

export { server, app };