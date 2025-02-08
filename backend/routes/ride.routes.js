const express = require("express");
const router = express.Router();
const { body, query } = require('express-validator');
const authMiddleWare = require("../middleware/auth.middleware");
const rideController = require("../controllers/ride.controller");

router.post("/create", authMiddleWare.authUser, rideController.createRide);
router.get('/getfare',query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),authMiddleWare.authUser, rideController.getFare)
router.post('/confirm', authMiddleWare.authCaptain, rideController.confirmRide)
router.post('/start-ride', authMiddleWare.authCaptain, rideController.startRide)
router.post('/end-ride',authMiddleWare.authCaptain,rideController.endRide)

module.exports = router