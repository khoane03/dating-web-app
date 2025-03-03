import express from 'express';
import cors from 'cors';
import { authRouter } from './router/authRouter.js';
import { userRouter } from './router/userRouter.js';
import { authMiddleware } from './middlewares/authMiddleWare.js';
import { searchRouter } from './router/searchRouter.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);
app.use('/api', searchRouter);

export const viteNodeApp = app;