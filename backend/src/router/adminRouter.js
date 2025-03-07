import express from "express";
import {
    getAllAccounts, 
    getAccount,
    getMatchedUsers,
    deleteAccountById,
    deleteMatchById,
    updateAccount,
    searchAccount
} from "../controller/adminController.js";

export const adminRouter = express.Router();

adminRouter.get("/", getAllAccounts);
adminRouter.get("/info", getAccount);
adminRouter.get("/match", getMatchedUsers);
adminRouter.delete("/acc/:id", deleteAccountById);
adminRouter.delete("/match/:id", deleteMatchById);
adminRouter.put("/acc", updateAccount);
adminRouter.get("/acc/search", searchAccount);

