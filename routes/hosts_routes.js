
const hostsController = require('../controllers/hosts_controller');
const express = require('express');
const router = express.Router();
const {users_auth} = require('../controllers/users_controller');


// hosting routes

router.get('/',users_auth,hostsController.all);
router.post('/hostPlace',users_auth,hostsController.add);
router.delete('/deletePlace/:id',users_auth,hostsController.delete);


module.exports = router;
