const reservationsController = require('../controllers/reservations_controller');
const express = require("express");
const router = express.Router();

router.post("/add/new", reservationsController.add);
router.get("/res/:id", reservationsController.fetchRes);
router.get("/forplace/:id", reservationsController.fetchAllForPlace);
router.get("/foruser/:id", reservationsController.fetchAllForUser);
router.delete("/res/:id", reservationsController.deleteRes);

module.exports = router; 