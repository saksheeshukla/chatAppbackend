const User = require('../models/user.model.js');

// Search users by username
async function searchUsers(req, res) {
  try{
    console.log(req.params.username);
    const regex = new RegExp(req.params.username,'i'); // Assuming 'username' directly contains the substring

    /* {username:1,email:1}  will return these from db*/  
    const users = await User.find({ username: { $regex: regex } }, {username:1,avatar:1,name:1});
    res.status(200).json(users);
  }
  catch(error){
    console.error('You have got an error', error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  searchUsers,
};
