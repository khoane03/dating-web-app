import express from "express";
import { saveMessage, getHistory } from "../controller/chatController";

export const chatRouter = express.Router();

chatRouter.post('/', saveMessage)
chatRouter.get('/', getHistory)