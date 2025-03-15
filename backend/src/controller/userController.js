import apiResponse from "../utils/apiResponse.js";
import {
    getInfoUser as getUserService,
    changePassword as changePasswordService,
    addOrUpdateProfile as addUserProfileService,
    updateAvatar as updateAvatarService
} from "../service/userService.js";
import handleCloudinaryUpload from "../utils/cloudinary.js";

export const addOrUpdateProfile = async (req, res) => {
    const { id } = req.user;
    const data = req.body;
    const result = await addUserProfileService(id, data);
    return apiResponse(res, result.code, result.message);
};

export const updateAvatar = async (req, res) => {
    const { id } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: "Vui lòng chọn ảnh!" });
    }
    // Upload ảnh lên cloudinary và lấy url
    const url = await handleCloudinaryUpload(req.file);
    // Cập nhật url ảnh vào database
    const result = await updateAvatarService(id, url);
    return apiResponse(res, result.code, result.message);
};


export const getUserById = async (req, res) => {
    let id = null;
    let type = null;
    if (req.query.id) {
        id = req.query.id;
        type = 'id';
    } else {
        id = req.user.id;
        type = 'acc_id';
    }
    const result = await getUserService(id, type);
    return apiResponse(res, 200, result.message, result.data);
}



export const changePassword = async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;
    const result = await changePasswordService(id, oldPassword, newPassword);
    return apiResponse(res, result.code, result.message);

}

