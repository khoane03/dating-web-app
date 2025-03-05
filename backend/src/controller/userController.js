import apiResponse from "../utils/apiResponse.js";
<<<<<<< HEAD

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
=======
import {
    getUserLogin as getUserLoginService,
    changePassword as changePasswordService
} from "../service/userService.js";
>>>>>>> 3bdbc2632dea5c4f8b3416dcc61c1779583b8ef4

export const getUserLogin = async (req, res) => {
    const user = req.user;
    const result = await getUserLoginService(user);
    return apiResponse(res, 200, result.message, result.data);
<<<<<<< HEAD
}   

=======
}


export const changePassword = async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;
    const result = await changePasswordService(id, oldPassword, newPassword);
    return apiResponse(res, result.code, result.message);

}
>>>>>>> 3bdbc2632dea5c4f8b3416dcc61c1779583b8ef4
