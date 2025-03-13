import express from "express";
import { addMess, getMess } from "../controller/chatController";
export const chatRouter = express.Router();
chatRouter.post('/', addMess)
chatRouter.get('/', getMess)