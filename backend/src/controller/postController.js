import handleCloudinaryUpload from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
import {
    saveImage,
    getAllPosts,
    getImageByUserId,
    deleteById
} from "../service/postService.js";

export const savePost = async (req, res) => {
    const { id } = req.user;
    const { content } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: "Vui lòng chọn ảnh!" });
    }
    const image_url = await handleCloudinaryUpload(req.file);
    const result = await saveImage(id, content, image_url);
    return apiResponse(res, result.code, result.message, result.data);
};

export const getAllPost = async (req, res) => {
    const { id } = req.user;
    const result = await getAllPosts(id);
    return apiResponse(res, result.code, result.message, result.data);
};

export const getPostByUserId = async (req, res) => {
    const { id } = req.params;
    const result = await getImageByUserId(id);
    return apiResponse(res, result.code, result.message, result.data);
}

export const deletePostById = async (req, res) => {
    const { id } = req.params;
    const result = await deleteById(id);
    return apiResponse(res, result.code, result.message, result.data);
}