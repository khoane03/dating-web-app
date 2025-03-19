import express from "express";
import { 
    getUserById, 
    changePassword, 
    addOrUpdateProfile, 
    updateAvatar,
    saveUserReaction

} from "../controller/userController.js";
import { upload } from "../config/cloudinaryConfig.js";


export const userRouter = express.Router();

// Route upload ảnh
userRouter.post("/upload_avatar", upload.single("avatar"), updateAvatar);

userRouter.post("/add_profile", addOrUpdateProfile);
userRouter.get("/info", getUserById);
userRouter.put("/change-password", changePassword);
userRouter.post('/reaction', saveUserReaction);