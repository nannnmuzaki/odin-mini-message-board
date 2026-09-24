import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";
import { Message } from "../models/Message.js"
import { body, matchedData, validationResult } from "express-validator";

const usernameErr = "Username is required and max 255 characters with no space";
const textErr = "Text is required and max 2000 characters";

const validateMessage = [
  body("username").isLength({ min: 1, max: 255 }).withMessage(usernameErr),
  body("text").trim().isLength({ min: 1, max: 2000 }).withMessage(textErr)
]

export const index = async (req, res) => {
  const messages = await Message.findAll();
  res.render('index', { messages: messages });
}

export const show = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    throw new CustomNotFoundError(`No message with id ${req.params.id} is found`);
  }

  res.render('message', { message: message });
}

export const create = async (req, res) => {
  const formType = "create";
  res.render('create-message', { formType: formType, message: null });
}


export const store = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formType = "create";
      return res.status(400)
        .render("create-message",{ formType: formType, errors: errors.array(), message: req.body });
    }
    const { username, text } = matchedData(req);
    await Message.create(username, text);
    res.redirect('/');
  }
]

export const edit = async (req, res) => {
  const formType = "edit";
  const id = req.params.id;
  const message = await Message.findById(id);
  console.log(message);

  if (!message) {
    throw new CustomNotFoundError(`No message with id ${req.params.id} is found`);
  }

  res.render('edit-message', { formType: formType, message: message });
}

export const update = async (req, res) => {
  const id = req.params.id
  const updatedData = req.body;
  const updatedMessage = await Message.update(id, updatedData);

  if (!updatedMessage) {
    throw new CustomNotFoundError(`No message with id ${req.params.id} is found`);
  }

  res.redirect('/');
}


export const destroy = async (req, res) => {
  const id = req.params.id
  const deletedMessage = await Message.delete(id);

  if (!deletedMessage) {
    throw new CustomNotFoundError(`No message with id ${req.params.id} is found`);
  }

  res.redirect('/');
}
