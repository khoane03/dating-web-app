import { checkMatch, createMatch, getListMatch as getListMatchService, getMatchById as getMatchByIdService, updateMatch as updateMatchService } from "../service/matchService.js";

export const addMatch = async (req, res) => {
    const { id } = req.user;
    const { user_id_b } = req.query;
    const result = await createMatch(id, user_id_b);
    return res.json(result);
};

export const getMatchById = async (req, res) => {
    const { id } = req.user;
    const result = await getMatchByIdService(id);
    return res.json(result);
};

export const updateMatch = async (req, res) => {
    const { id, status } = req.body;
    const result = await updateMatchService(id, status);
    return res.json(result);
};

export const getMatchList = async (req, res) => {
    const { id } = req.user;
    const result = await getListMatchService(id);
    return res.json(result);
};

export const checkMatchController = async (req, res) => {
    const { id } = req.user;
    const { id_b } = req.query;
    const result = await checkMatch(id, id_b);
    return res.json(result);
};