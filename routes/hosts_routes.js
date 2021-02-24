
const hostsController = require('../controllers/hosts_controller');
const express = require('express');
const router = express.Router();
const {users_auth} = require('../controllers/users_controller');
const {add:addPlace , delete:deletePlace} = require("../controllers/places_controllers")


// hosting routes

router.get('/',users_auth,hostsController.all);
router.post('/hostPlace',[users_auth,addPlace],hostsController.add);
router.delete('/deletePlace/:id',[users_auth,hostsController.delete],deletePlace);


module.exports = router;