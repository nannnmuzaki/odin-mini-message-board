import { Router } from "express";
import * as messageController from "../controllers/messageController.js";

export const messageRouter = Router();

messageRouter.get('/', messageController.index)
messageRouter.get('/message/new', messageController.create)
messageRouter.post('/message/new', messageController.store)
messageRouter.get('/message/:id', messageController.show)
