const mongoose = require('../config/db.js');

// ChatReference Schema
const chatReferenceSchema = new mongoose.Schema({
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  },
  reference_id: {
    type: String,
    required: true,
    unique: true,
  },
});

const ChatReference = mongoose.model('ChatReference', chatReferenceSchema);
module.exports = ChatReference;
