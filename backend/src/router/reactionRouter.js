import express from "express";
import { addReactions, countReactions, getReactions } from "../controller/reactionController.js";

export const reactionRouter = express.Router();

reactionRouter.post('/', addReactions);
reactionRouter.get('/', countReactions);
reactionRouter.get('/check', getReactions);