import apiResponse from "../utils/apiResponse.js";

import { add } from "../service/userInfo.js";

export const addUserProfile = async (req, res) => {
    try {
        const { fullName, gender, dob, age, occupation, bio, avatar_url, address } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!fullName || !gender || !dob || !age || !occupation || !bio || !avatar_url || !address) {
            return apiResponse(res, 400, "All fields are required");
        }

        // Gọi hàm add để thêm dữ liệu vào database
        const response = await add(fullName, gender, dob, age, occupation, bio, avatar_url, address);

        return apiResponse(res, 201, response.message, response.result);
    } catch (error) {
        return apiResponse(res, 500, "Internal server error", error.message);
    }
};
import { getUserLogin as getUserLoginService } from "../service/userService.js";

export const getUserLogin = async (req, res) => {
    const user = req.user;
    const result = await getUserLoginService(user);
    return apiResponse(res, 200, result.message, result.data);
}   

