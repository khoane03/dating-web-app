import { axiosService } from "./axiosService";

const getAllAccounts = async (pageIndex, pageSize) => {
    return await axiosService.get("/admin",
        {
            params: {
                pageIndex,
                pageSize
            }
        });
}

const getAccount = async () => {
    return await axiosService.get("/admin/info", );
}

const getMatchedUsers = async (pageIndex, pageSize) => {
    return await axiosService.get("/admin/match",
        {
            params: {
                pageIndex,
                pageSize
            }
        });
}

const updatStatusAccount = async (id, status) => {
    return await axiosService.put("/admin/acc", {id, status});
}

const searchByKeyword = async (keyword) => {
    return await axiosService.get(`/admin/acc/search?keyword=${keyword}`);
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
    deleteMatchById,
    searchByKeyword
}