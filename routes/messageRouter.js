import { Router } from "express";
import * as messageController from "../controllers/messageController.js";

export const messageRouter = Router();

messageRouter.get('/', messageController.index);
messageRouter.get('/messages/new', messageController.create);
messageRouter.post('/messages/new', messageController.store);
messageRouter.get('/messages/:id', messageController.show);
messageRouter.get('/messages/:id/edit', messageController.edit);
messageRouter.post('/messages/:id/edit', messageController.update);
messageRouter.post('/messages/:id/delete', messageController.destroy);
