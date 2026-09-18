import { messages } from "../db/messages"

export const Message = {
  findAll() {
    return messages;
  },

  findById(id) {
    return messages.find(message => message.id === id);
  },

  create(user, text) {
    const newMessage = {
      id: crypto.randomUUID(),
      user: user,
      text: text,
      added: new Date()
    };

    messages.push(newMessage);
    return newMessage;
  },

  update(id, updatedMessage) {
    const index = messages.findIndex(message => message.id === id);
    if (index === -1) return null;

    messages[index] = { ...messages[index], ...updatedMessage };

    return messages[index];
  },

  delete(id) {
    const index = messages.findIndex(message => message.id = id);
    if (index === -1) return null;

    const deletedData = { ...messages[index] };

    messages.splice(index, 1);
    return deletedData;
  }
}
