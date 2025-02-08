const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleWare = require('../middleware/auth.middleware')

router.post('/register',[body('email').isEmail().withMessage('Invalid Email'), body('fullname.firstname').isLength({min: 3}).withMessage('First Name must be at least 3 character'),body('fullname.lastname').isLength({min: 3}).withMessage('First Name must be at least 3 character'),body('password').isLength({min: 8}).withMessage('Password length must be 8')],userController.registerUser)

router.post('/login', 
    [body('email').isEmail().withMessage('Invalid Email'),body('password').isLength({min: 8}).withMessage('Password length must be 8')],
    userController.loginUser)

router.get('/profile',authMiddleWare.authUser,userController.getUserProfile)
router.get('/logout', authMiddleWare.authUser,userController.logoutUser)
    
module.exports = router