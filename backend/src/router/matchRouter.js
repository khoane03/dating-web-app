import express from 'express';
import { addMatch, checkMatchController, getMatchById, getMatchList, updateMatch } from '../controller/matchController.js';


export const matchRoute = express.Router();

matchRoute.post('', addMatch);
matchRoute.get('', getMatchById);
matchRoute.put('', updateMatch);
matchRoute.get('/list', getMatchList);
matchRoute.get('/check', checkMatchController);