import { Message } from "../models/Message.js"

export const index = async (req, res) => {
  const messages = Message.findAll();
  res.render('index', { messages: messages });
}
