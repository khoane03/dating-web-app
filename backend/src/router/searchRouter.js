import express from "express";
import { searchUsersHandler } from "../controller/searchController.js";
const router = express.Router();

router.get("/search", searchUsersHandler); 

export { router as searchRouter };