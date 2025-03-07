import apiResponse from '../utils/apiResponse';
import {
    getAllAccounts as getAllAccountsService,
    getAccById as getAccountService,
    getAllMatches as getAllMatchesService,
    deleteAccountById as deleteAccountService,
    updatStatusAccount as updateAccountService,
    deleteMatchById as deleteMatchService
} from '../service/adminService';

export const getAccount = async (req, res) => {
    try {
        const {id} = req.user;
        const result = await getAccountService(id);
        return apiResponse(res, result.code, result.message, result.data);
    } catch (error) {
        return apiResponse(res, 500, error.message);
    }
};

export const getAllAccounts = async (req, res) => {
    try {
        const result = await getAllAccountsService();
        return apiResponse(res, result.code, result.message, result.data);
    } catch (error) {
        return apiResponse(res, 500, error.message);
    }
};

export const getMatchedUsers = async (req, res) => {
    try {
        const result = await getAllMatchesService();
        return apiResponse(res, result.code, result.message, result.data);
    } catch (error) {
        return apiResponse(res, 500, error.message);
    }
} 

export const updateAccount = async (req, res) => {
    const {id, status} = req.body;
    const result = await updateAccountService(id, status);
    return apiResponse(res, result.code, result.message);
}

export const deleteAccountById = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    const result = await deleteAccountService(id);
    return apiResponse(res, result.code, result.message);
}

export const deleteMatchById = async (req, res) => {
    const {id} = req.params;
    const result = await deleteMatchService(id);
    return apiResponse(res, result.code, result.message);
};
