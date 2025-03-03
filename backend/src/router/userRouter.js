import express from "express";
<<<<<<< HEAD
import { addUserProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/add-profile", addUserProfile);

export { userRouter };
=======
import { getUserLogin } from "../controller/userController";

export const userRouter = express.Router();

userRouter.get("/info", getUserLogin);
>>>>>>> 40c3a0f74f5c1850a6157b8629b05aa5ba2a1bb6
