import apiResponse from "../utils/apiResponse.js";
import { getUserLogin as getUserLoginService } from "../service/userService.js";

export const getUserLogin = async (req, res) => {
    const user = req.user;
    const result = await getUserLoginService(user);
    return apiResponse(res, 200, result.message, result.data);
}   