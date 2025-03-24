import { axiosService } from "./axiosService";

const getUserLogin = async (id) => {
    const endpoint = id ? `/user/info?id=${id}` : "/user/info";
    return await axiosService.get(endpoint);
};

const changePassword = async (data) => {
    console.log(data);
    return await axiosService.put("/user/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
    });
};

const updateUserProfile = async (data) => {
    console.log(data);
    return await axiosService.post("/user/add_profile", data);
};

const avatarUpdate = async (formData) => {
    console.log(formData);
    return await axiosService.post("/user/upload_avatar", formData);
};

export {
    getUserLogin,
    changePassword,
    updateUserProfile,
    avatarUpdate
};
