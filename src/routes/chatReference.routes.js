const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller.js');
const chatListController = require('../controllers/chatList.controllers.js');
const chatController = require('../controllers/chatReference.controller.js');

// Add a new chat message
router.post('/chats', chatController.addChatMessage);

// Get all chat messages between two users by their usernames
router.get('/chats/:sender_username/:receiver_username', chatController.getChatMessagesByUsers);

// Update a chat message
router.put('/update', chatController.updateChatMessage);

// Delete a chat message
router.delete('/delete', chatController.deleteChatMessage);

// Get all chat lists for a user
router.get('/chatlist/:username', chatListController.getUserChatList);

// Search users by username
router.get('/search/:username', searchController.searchUsers);

module.exports = router;
