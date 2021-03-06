const Users = require('../models/Users');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenList = {}


module.exports = {
  //
  // get all users
  //
  all(req, res) {
    const limit = parseInt(req.query.limit) || "";
    Users.find({})
      .limit(limit)
      .then((users) => res.status(200).json(users))
      .catch(console.log);
  },
  //
  //signup middleware
  //
  async signup(req, res) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      fname,
      email,
      password,
      lname,
      phone_number,
      profile_img,
    } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: "User Email Already Exists",
        });
      }
      user = new Users({
        fname,
        lname,
        email,
        password,
        phone_number,
        profile_img,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        "randomStringSecret",
        {
          expiresIn: "5m",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  },
  //
  // login middleware
  //
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: "User Not Exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect Password !" });
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, "randomStringSecret", { expiresIn: "20m"});
      const refreshToken = jwt.sign(payload, "randomStringSecretForRef", { expiresIn: "1h"});
      const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
      }
      tokenList[refreshToken] = response;
      //console.log(tokenList);
      res.cookie("refreshToken", refreshToken,{
        httpOnly:true
      });
      res.status(200).json(response);
      /*
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );*/
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error" });
    }
  },
  refresh (req,res){

    const postData = req.ref;
    
    
    
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
      
      const payload = {
        user: {
          id: req.user.id,
        },
      };
        const token = jwt.sign(payload, "randomStringSecret", { expiresIn: "20m"});
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
  },
  //
  //fetch a user by ID
  //
  async fetchUserById(req, res){
    const userId = req.params.id;
    try {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send("unable to fetch user");
    }
  },
  //
  //fetching a certain user
  //
  async fetchUser(req, res) {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await Users.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  },

  //
  // auth check middleware to be deconstructed
  //
  users_auth(req, res, next) {
    const token = req.header("token");
    
    if (!token) return res.status(401).json({ message: "Auth Error" });
    try {
      const decoded = jwt.verify(token, "randomStringSecret");
      req.user = decoded.user;
      req.ref = {refreshToken:req.cookies.refreshToken}
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Invalid Token or Expired" });
    }
  },
  //
  //  updating User info middleware
  //
  edit(req, res, next) {
    const userId = req.params.id;
    const userProps = req.body;
    console.log(userId, userProps);
    // get user and update
    Users.findByIdAndUpdate({ _id: userId }, userProps)
      // if success get user after updated
      .then(() => Users.findById({ _id: userId }))
      // //if you get user send it
      .then((user) => res.status(200).send(user))
      // //else send to middle
      .catch(next);
  },
  //
  // deleting user middleware
  //
  delete(req, res, next) {
    const userId = req.params.id;
    Users.findByIdAndRemove({ _id: userId })
      .then(() => res.status(204).json({ message: "Deleted Successfully" }))
      .catch(next);
  },
};
