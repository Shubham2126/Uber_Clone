const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const authMiddleware = require("../middleware/auth.middleware")
const captainController = require('../controllers/captain.controller')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('first name must be at least 3 characters'),
    body('password').isLength({min:3}).withMessage('Password must be at least 6 characters'),
],captainController.registerCaptain)

router.post('/login',[body('email').isEmail().withMessage('Invalid Email'),body('password').isLength({min:3}).withMessage('Password must be at least 6 characters')],captainController.loginCaptain)

router.get('/profile',authMiddleware.authCaptain, captainController.getProfile)
router.get('/logout',authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router