import { axiosService } from "./axiosService";

const getAllAccounts = async () => {
    return await axiosService.get("/admin");
}

const getAccount = async () => {
    return await axiosService.get("/admin/info");
}

const getMatchedUsers = async () => {
    return await axiosService.get("/admin/match");
}

export {
    getAllAccounts,
    getAccount,
    getMatchedUsers
}