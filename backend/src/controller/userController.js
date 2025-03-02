import apiResponse from "../utils/apiResponse.js";
import { getUserLogin as getUserLoginService } from "../service/userService.js";

export const getUserLogin = async (req, res) => {
    const { token } = req.body;
    const result = await getUserLoginService(token);
    return apiResponse(res, 200, result.message, result.data);
}   