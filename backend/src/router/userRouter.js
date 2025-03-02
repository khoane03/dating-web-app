import express from "express";
import { getUserLogin } from "../controller/userController";

export const userRouter = express.Router();

userRouter.post("/info", getUserLogin);