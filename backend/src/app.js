import express from 'express';
import cors from 'cors';
import { authRouter } from './router/authRouter.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

export const viteNodeApp = app;