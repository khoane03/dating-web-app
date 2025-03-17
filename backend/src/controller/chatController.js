import { getMess, getListChat, getInfoChat } from "../service/chatService.js";
import apiResponse from "../utils/apiResponse.js";

export const getHistory = async (req, res) => {
  const { id } = req.user;
  const { receiver_id } = req.query;
  const response = await getMess(id, receiver_id);
  apiResponse(res, response.code, response.message, response.data);
};

export const getList = async (req, res) => {
  const { id } = req.user;
  const response = await getListChat(id);
  apiResponse(res, response.code, response.message, response.data);
};

export const getInfo = async (req, res) => {
  const { receiver_id } = req.query;
  const response = await getInfoChat(receiver_id);
  apiResponse(res, response.code, response.message, response.data);
};