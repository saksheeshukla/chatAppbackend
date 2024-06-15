const ChatReference = require('../models/chatReference.js');
const Chat = require('../models/userChat.js');
const User = require('../models/user.model.js');

// Get all chat lists for a user
async function getUserChatList(req, res) {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    //find all the chats where user is a partcipant.
    const chatReferences = await ChatReference.find({ participants: user._id });

    const chatList = await Promise.all(chatReferences.map(async (chatRef) => {
      //finding latest messages
      const latestChat = await Chat.findOne({ chat_ref_id: chatRef._id })
        .sort({ createdAt: -1 });
        // .populate('sender_id receiver_id');
      
      if (!latestChat) {
        return null;
      }

      const chatPartnerId = chatRef.participants.find(participantId => !participantId.equals(user._id));
      const chatPartner = await User.findById(chatPartnerId);
 
      return {
        chatPartner: chatPartner.username,
        chatPartnerAvtr: chatPartner.avatar,
        chatPartnerName:chatPartner.name,
        chatPartnerUsername:chatPartner.username,
        latestMessage: latestChat.message,
        timestamp: latestChat.createdAt,
        sender: latestChat.sender_id.username,
        receiver: latestChat.receiver_id.username
      };
    }));

    const filteredChatList=chatList.filter(chat=>chat!=null);
    const allChats=chatList.filter(chat=>chat==null);

    res.status(200).send(filteredChatList);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
}

module.exports = {
  getUserChatList,
};
