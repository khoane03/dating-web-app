import { axiosService } from "./axiosService";

const getAllPosts = async () => {
    return axiosService.get('/post');
};
const getPostByUserId = async (id) => {
    return axiosService.get(`/post/user/${id}`);
};
const savePost = async (formData) => {
    return axiosService.post('/post/', formData);
};
const deletePostById = async (id) => {
    return axiosService.delete(`/post/${id}`)
};

export {
    getAllPosts,
    getPostByUserId,
    savePost,
    deletePostById
};