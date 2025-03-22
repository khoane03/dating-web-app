import express from "express";
import { upload } from "../config/cloudinaryConfig.js";
import {
    deletePostById,
    getAllPost,
    getPostByUserId,
    savePost
} from "../controller/postController.js";


export const postRouter = express.Router();

postRouter.post("/", upload.single("image"), savePost);
postRouter.get("/", getAllPost);
postRouter.get("/user/:id", getPostByUserId);
postRouter.delete("/:id", deletePostById);