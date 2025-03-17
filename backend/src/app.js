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
import { setupWebSocket } from './config/websocketConfig.js';

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use('/admin', authMiddleware, authRole(ROLES.ADMIN), adminRouter);
app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);
app.use('/api',authMiddleware, searchRouter);
app.use('/chat', authMiddleware, chatRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await initAdmin();
    
    server.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
        
        setupWebSocket(server);
        console.log("✅ WebSocket Server Initialized");
    });
};

startServer();

export const viteNodeApp = app;