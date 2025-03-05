import express from "express";
import {
    getAllAccounts, 
    getAccount,
    getMatchedUsers
} from "../controller/adminController.js";

export const adminRouter = express.Router();

adminRouter.get("/", getAllAccounts);
adminRouter.get("/info", getAccount);
adminRouter.get("/match", getMatchedUsers);