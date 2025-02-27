import express from 'express';
import cors from 'cors';
import { authRouter } from './router/authRouter.js';
import { userRouter } from './router/userRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', userRouter); 

app.get('/', (req, res) => {
    res.send('Server is running!');
});

export const viteNodeApp = app;