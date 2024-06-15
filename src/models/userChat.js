// models/Chat.js
const mongoose = require('../config/db.js');

const ChatSchema = new mongoose.Schema({
  sender_id: {
    type: String, // Corrected reference
    required: true,
  },
  receiver_id: {
    type: String, // Corrected reference
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  chat_ref_id: {
    type: mongoose.Schema.Types.ObjectId, // Corrected reference
    ref: 'ChatReference',
    required: true,
  },
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
