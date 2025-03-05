import apiResponse from '../utils/apiResponse';
import {
    getAllAccounts as getAllAccountsService,
    getAccById as getAccountService,
    getAllMatches as getAllMatchesService
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