import { addReaction, countReaction } from "../service/reactionService.js";
import apiResponse from "../utils/apiResponse.js";

export const addReactions = async (req, res) => {
    const {id} = req.user;
    const {reaction_type, post_id} = req.body;
    const result = await addReaction(id, reaction_type, post_id);
    apiResponse(res, result.status, result.message, result.data);
};

export const countReactions = async (req, res) => {
    const {post_id} = req.query;
    const result = await countReaction(post_id);
    apiResponse(res, result.status, result.message, result.data);
};