<<<<<<< HEAD
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
=======
import express from 'express';
import cors from 'cors';
import { authRouter } from './router/authRouter.js';
import { userRouter } from './router/userRouter.js';
import { authMiddleware, authRole } from './middlewares/authMiddleWare.js';
import { searchRouter } from './router/searchRouter.js';
import cookieParser from "cookie-parser";
import { adminRouter } from './router/adminRouter.js';
import { ROLES } from './utils/appConstants.js';
import { initAdmin } from './service/adminService.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

// init admin account if not exist
await initAdmin();

app.use('/admin', authMiddleware, authRole(ROLES.ADMIN), adminRouter)
app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);
app.use('/api', searchRouter);
>>>>>>> 0459c256cc60a2f92a69ee7ac0fe0d236247e9d2

// Thiết lập WebSocket
const io = new Server(server, {
  cors: { origin: "*" },
});
setupSocket(io);

export { server, app };