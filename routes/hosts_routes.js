
const hostsController = require('../controllers/hosts_controller');
const express = require('express');
const router = express.Router();
const {users_auth} = require('../controllers/users_controller');
const {add:addPlace , delete:deletePlace} = require("../controllers/places_controllers")


// hosting routes

router.get("/", users_auth, hostsController.spec);
router.get("/hosts", hostsController.all);

router.post('/hostPlace',[users_auth,addPlace],hostsController.add);
router.delete('/deletePlace/:id',[users_auth,hostsController.delete],deletePlace);
router.delete('/deletePlace/admin/:id',[hostsController.deleteFromAdmin],deletePlace);


module.exports = router;
