const usermodel = require('../models/user.models')
const userService = require('../services/user.services')
const {validationResult} = require('express-validator')
const blacklistedToken = require('../models/blacklistToken.model')

module.exports.registerUser = async(req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const { fullname, email, password} = req.body;
    const isUserExist = await usermodel.findOne({email})
    if(isUserExist){
        return res.status(400).json({message: 'User already exist with this email'})
    }
     const hashpassword = await usermodel.hashPassword(password)
    

     const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashpassword
});
    const token = user.generateAuthToken();
    res.status(201).json({token, user})
}

module.exports.loginUser = async(req,res, next) =>{
    const {email, password} = req.body;
    
    const user = await usermodel.findOne({email}).select('+password');
    if(!user){
        res.status(401).json({message:'Invalid email or password'})
    }
    const match = await user.comparePassword(password);
    if(!match){
        res.status(401).json({message:'Invalid email or password'})
    }
    const token = user.generateAuthToken();
    res.cookie('token', token)
    res.status(201).json({token,user})
}

module.exports.getUserProfile = async(req,res) =>{
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports.logoutUser = async(req,res) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await blacklistedToken.create({token})
    res.status(201).json({message:'Logged out'})
}