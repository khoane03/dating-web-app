import express from "express";
import { 
    getUserLogin, 
    changePassword, 
    addOrUpdateProfile, 
    updateAvatar
} from "../controller/userController.js";
import { upload } from "../config/cloudinaryConfig.js";


export const userRouter = express.Router();

// Route upload ảnh
userRouter.post("/upload_avatar", upload.single("avatar"), updateAvatar);

userRouter.post("/add_profile", addOrUpdateProfile);
userRouter.get("/info", getUserLogin);
userRouter.put("/change-password", changePassword);
