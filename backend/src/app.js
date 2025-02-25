import express from 'express';
import cors from 'cors';
import { authRouter } from './router/authRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

export const viteNodeApp = app;