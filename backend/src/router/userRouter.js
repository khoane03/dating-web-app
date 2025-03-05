import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import { addUserProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/add-profile", addUserProfile);

export { userRouter };
=======
import { getUserLogin } from "../controller/userController";
=======
import { getUserLogin, 
    changePassword
 } from "../controller/userController";
>>>>>>> 3bdbc2632dea5c4f8b3416dcc61c1779583b8ef4

export const userRouter = express.Router();

userRouter.get("/info", getUserLogin);
<<<<<<< HEAD
>>>>>>> 40c3a0f74f5c1850a6157b8629b05aa5ba2a1bb6
=======
userRouter.put("/change_password", changePassword);
>>>>>>> 3bdbc2632dea5c4f8b3416dcc61c1779583b8ef4
