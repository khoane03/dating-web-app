import { axiosService } from "./axiosService";

const addMatch = async (user_id_b) => {
    return await axiosService.post(`/match?user_id_b=${user_id_b}`);
};

const getMatchById = async () => {
    return await axiosService.get(`/match`);
};

const updateMatchRequestStatus = async (matchId, status) => {
    return await axiosService.put(`/match`, {
        id: matchId,
        status: status
    });
};

const getListMatch = async () => {
    return await axiosService.get(`/match/list`);
};

const checkMatch = async (id_b) => {
    return await axiosService.get(`/match/check?id_b=${id_b}`);
}

export {
    addMatch,
    getMatchById,
    updateMatchRequestStatus,
    getListMatch,
    checkMatch
}