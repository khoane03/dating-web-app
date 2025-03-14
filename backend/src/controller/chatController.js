import { getMess, saveMess } from "../service/chatService.js";
import apiResponse from "../utils/apiResponse.js";

export const saveMessage = async (req, res) => {
  const { id } = req.user;
  const { receiver_id, message } = req.body;
  const response = await saveMess(id, receiver_id, message);
  apiResponse(res, response.code, response.message, response.data);
};

export const getHistory = async (req, res) => {
  const { id } = req.user;
  const { receiver_id } = req.query;
  const response = await getMess(id, receiver_id);
  apiResponse(res, response.code, response.message, response.data);
};