import express from 'express';
import { authRouter } from './router/authRouter.js';
import pool from './config/dbConfig.js';



const app = express();
app.use(express.json());

app.use('/auth', authRouter);

export const viteNodeApp = app;