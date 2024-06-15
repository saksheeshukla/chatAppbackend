const User = require('../models/user.model.js');
const ChatReference = require('../models/chatReference.js');
const Chat = require('../models/userChat.js');
const { v4: uuidv4 } = require('uuid');

const chatController = {
  getOrCreateChatReference: async (senderId, receiverId) => {
    const participants = [senderId, receiverId].sort();

    let reference = await ChatReference.findOne({ participants });

    if (!reference) {
      reference = new ChatReference({
        participants,
        reference_id: uuidv4(),
      });
      await reference.save();
    }

    return reference;
  },

  addChatMessage: async (req, res) => {
    const { sender_username, receiver_username, message } = req.body;

    try {
      const sender = await User.findOne({ username: sender_username });
      const receiver = await User.findOne({ username: receiver_username });
      if (!sender || !receiver) {
        return res.status(400).send('Invalid sender or receiver');
      }
      
      const reference = await chatController.getOrCreateChatReference(sender._id, receiver._id);

      const chat = new Chat({ 
        sender_id: sender.username,
        receiver_id: receiver.username,
        message,
        chat_ref_id: reference._id,
      });
      await chat.save();

      res.status(201).send(chat);
    } catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  },

  getChatMessagesByUsers: async (req, res) => {
    const { sender_username, receiver_username } = req.params;
    console.log('Request received:', sender_username, receiver_username);
  
    try {
      const sender = await User.findOne({ username: sender_username });
      const receiver = await User.findOne({ username: receiver_username });
  
      if (!sender || !receiver) {
        return res.status(400).send('Invalid sender or receiver');
      }
  
      const participants = [sender._id, receiver._id].sort();
      const reference = await ChatReference.findOne({ participants });
  
      if (!reference) {
        return res.status(200).json([]);
      }
  
      // const messages = await Chat.find({ chat_ref_id: reference._id }).populate('sender_id receiver_id');
      const messages = await Chat.find({ chat_ref_id: reference._id });
      // console.log(messages);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  },
  
  updateChatMessage: async (req, res) => {
    const { chat_id, message } = req.body;

    try {
      const chat = await Chat.findOne({ _id :chat_id });
      if (!chat) {
        return res.status(404).send('Chat not found');
      }

      chat.message = message;
      await chat.save();

      res.status(200).send(chat);
    } catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  },

  deleteChatMessage: async (req, res) => {
    const { chat_id } = req.body;

    try {
      const chat = await Chat.findOneAndDelete({ _id :chat_id });
      if (!chat) {
        return res.status(404).send('Chat not found');
      }

      res.status(200).send('Chat deleted');
    } catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  },
};

module.exports = chatController;
