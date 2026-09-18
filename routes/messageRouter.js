import { Router } from "express";
import { index } from "../controllers/messageController.js";

export const messageRouter = Router();

messageRouter.get('/', index)
