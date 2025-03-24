import { searchUsers } from "../service/searchService.js";
import apiResponse from "../utils/apiResponse.js";

export const searchUsersHandler = async (req, res) => {
    const keyword = req.query;
    const {id} = req.user;

    if (!keyword) {
        return apiResponse(res, 400, "Thiếu thông số tìm kiếm!");
    }
    try {
        const users = await searchUsers(keyword, id);
        apiResponse(res, users.code, users.message, users.data);
    } catch (error) {
        apiResponse(res, 500, "Lỗi server! Vui lòng thử lại sau.");
    }
};