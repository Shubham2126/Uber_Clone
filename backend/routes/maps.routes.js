const express = require("express");
const router = express.Router();
const { query } = require('express-validator');
const authMiddleWare = require("../middleware/auth.middleware");
const mapController = require("../controllers/map.controller");

router.get("/get-coordinates",[query('address').isString().isLength({min:3}).withMessage('Invalid Pickup Location')],authMiddleWare.authUser,mapController.getCoordinates);

router.get('/get-distance',[query('origin').isString().isLength({min:3}).withMessage('Invalid Pickup Location'),
  query('destination').isString().isLength({min:3}).withMessage('Invalid Drop Location')
],authMiddleWare.authUser,mapController.getDistance)
router.get('/get-suggestion',[query('input').isString().isLength({min:3}).withMessage('Invalid Pickup Location')],authMiddleWare.authUser, mapController.getSuggestions)

module.exports = router;
