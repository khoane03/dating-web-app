import { axiosService } from "./axiosService";

const countReactions = async (postId) => {
    return axiosService.get(`/reaction`, { params: { post_id: postId } });
}

const saveReaction = async (reaction_type, post_id) => {
    return axiosService.post(`/reaction`, { reaction_type, post_id });
}

const checkReaction = async (post_id) => {
    return axiosService.get(`/reaction/check`, { params: { post_id } });
}

export {
    countReactions,
    saveReaction,
    checkReaction
};