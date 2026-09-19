import { Message } from "../models/Message.js"

export const index = async (req, res) => {
  const messages = Message.findAll();
  res.render('index', { messages: messages });
}

export const show = async (req, res) => {
  const message = Message.findById(req.params.id);
  res.render('message', { message: message });
}

export const create = async (req, res) => {
  const formType = "create";
  res.render('create-message', { formType: formType, message: null });
}

export const store = async (req, res) => {
  const { user, text } = req.body;
  Message.create(user, text);
  res.redirect('/');
}
