import express from "express";
import { addUserProfile } from "../controller/userController.js";
import {
    getUserLogin,
    changePassword
} from "../controller/userController";
import { getUserLogin } from "../controller/userController";

export const userRouter = express.Router();

userRouter.post("/add-profile", addUserProfile);
userRouter.get("/info", getUserLogin);
userRouter.put("/change_password", changePassword);
