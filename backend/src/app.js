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
import { chatRouter } from './router/chatRouter.js';
import http from 'http';
import {setupWebSocket} from './controller/chatController.js';
import locationRoute from './router/locationRouter.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);
app.use("/uploads", express.static("uploads")); // Cho phép truy cập ảnh trực tiếp

const startServer = async () => {
    // Khởi tạo admin trước khi chạy server
    await initAdmin();


    app.use('/admin', authMiddleware, authRole(ROLES.ADMIN), adminRouter);
    app.use('/auth', authRouter);
    app.use('/user', authMiddleware, userRouter);
    app.use('/api',authMiddleware, searchRouter);
    app.use('/chat', authMiddleware, chatRouter);
    app.use('/location', authMiddleware, locationRoute);
};


startServer();
export const viteNodeApp = app;
