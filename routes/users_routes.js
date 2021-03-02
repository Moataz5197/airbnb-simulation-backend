const usersController = require('../controllers/users_controller');
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {users_auth} = require('../controllers/users_controller');

//simple validation and sanitazation
const usersValidate =[
  body("email").isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];


// users routes

router.get('/',usersController.all);

router.post('/signup',usersValidate,usersController.signup);

router.post('/login',usersValidate,usersController.login);

router.get('/me',users_auth,usersController.fetchUser);


router.get("/:id", usersController.fetchUserById);

router.delete('/delete/:id',usersController.delete);

router.put('/edit/:id',usersValidate,usersController.edit);


module.exports = router;
