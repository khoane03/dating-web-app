import express from "express";
import { addUserProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/add-profile", addUserProfile);

export { userRouter };
