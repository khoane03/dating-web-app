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

const updatStatusAccount = async (id, status) => {
    return await axiosService.put("/admin/acc", {id, status});
}

const deleteAccountById = async (id) => {
    return await axiosService.delete(`/admin/acc/${id}`);
}

const deleteMatchById = async (id) => {
    return await axiosService.delete(`/admin/match/${id}`);
}

export {
    getAllAccounts,
    getAccount,
    getMatchedUsers,
    updatStatusAccount,
    deleteAccountById,
    deleteMatchById
}