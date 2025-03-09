import apiResponse from "../utils/apiResponse.js";
import {
    getUserLogin as getUserLoginService,
    changePassword as changePasswordService
} from "../service/userService.js";

import { addProfile } from "../service/userInfo.js";

export const addUserProfile = async (req, res) => {
    try {
        const { fullName, gender, dob, occupation, bio, avatar_url, address, hobbies, criteria } = req.body;
        const { id } = req.user

        // Kiểm tra dữ liệu đầu vào
        if (!fullName || !gender || !dob || !occupation || !bio || !avatar_url || !address || !hobbies || !criteria) {
            return apiResponse(res, 400, "All fields are required");
        }

        // Gọi hàm add để thêm dữ liệu vào database
        const response = await addProfile(fullName, gender, dob, occupation, bio, avatar_url, address, id, hobbies, criteria);

        return apiResponse(res, 201, response.message, response.result);
    } catch (error) {
        return apiResponse(res, 500, "Internal server error", error.message);
    }
};

export const getUserLogin = async (req, res) => {
    const user = req.user;
    const result = await getUserLoginService(user);
    return apiResponse(res, 200, result.message, result.data);
}



export const changePassword = async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;
    const result = await changePasswordService(id, oldPassword, newPassword);
    return apiResponse(res, result.code, result.message);

}

