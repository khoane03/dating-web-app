import express from "express";
import { addMess } from "../controller/chatController";
export const chatRouter = express.Router();
chatRouter.post('/', addMess)