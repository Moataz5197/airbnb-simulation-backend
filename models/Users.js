const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  phone_number:{
    type: String,
    required: true
  },
  profile_img: {
    type: String,
    required: true
  }
  /* i need to ask about this ? 
  createdAt: {
    type: Date,
    default: Date.now()
  }
  */
},{versionKey: false});

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
