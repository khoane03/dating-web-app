import express from "express";
import { getHistory, getList, getInfo } from "../controller/chatController";

export const chatRouter = express.Router();

chatRouter.get('/', getHistory)
chatRouter.get('/list-chat', getList)
chatRouter.get('/info-chat', getInfo)