import express from "express";
import { getUserLogin, 
    changePassword
 } from "../controller/userController";

export const userRouter = express.Router();

userRouter.get("/info", getUserLogin);
userRouter.put("/change_password", changePassword);