import { axiosService } from "./axiosService";

const getUserLogin = async () => {
    return await axiosService.get("/user/info");
};

const changePassword = async (data) => {
    return await axiosService.put("/user/change_password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
    });
};

const updateUserProfile = async (data) => {
    console.log(data);
    return await axiosService.post("/user/add_profile", data);
};

export {
    getUserLogin,
    changePassword,
    updateUserProfile
};
