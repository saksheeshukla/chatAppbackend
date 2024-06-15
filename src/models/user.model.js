const mongoose = require('../config/db.js');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar : {
    type:Number,
    default : 14
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
