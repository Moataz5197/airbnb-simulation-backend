const reservationsController = require('../controllers/reservations_controller');
const express = require("express");
const router = express.Router();
router.get("/", reservationsController.all);
router.post("/add/new", reservationsController.add);
router.get("/res/:id", reservationsController.fetchRes);
router.get("/forplace/:id", reservationsController.fetchAllForPlace);
router.get("/foruser/:id", reservationsController.fetchAllForUser);
router.delete("/deleteres/:id", reservationsController.deleteRes);

module.exports = router; 