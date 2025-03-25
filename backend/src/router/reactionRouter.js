import express from "express";
import { addReactions, countReactions } from "../controller/reactionController.js";

export const reactionRouter = express.Router();

reactionRouter.post('/', addReactions);
reactionRouter.get('/', countReactions);