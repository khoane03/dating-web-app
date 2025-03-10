import apiResponse from "../utils/apiResponse.js";
import {
    getUserLogin as getUserLoginService,
    changePassword as changePasswordService,
    addOrUpdateProfile as addUserProfileService,
} from "../service/userService.js";


export const addOrUpdateProfile = async (req, res) => {
    const { id } = req.user;
    const data = req.body;
    const result = await addUserProfileService(id, data);
    return apiResponse(res, result.code, result.message);
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

