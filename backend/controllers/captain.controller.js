const captainModel = require('../models/captain.model')
const CaptainService = require('../services/captain.services')
const blacklistToken = require('../models/blacklistToken.model')
const {validationResult} = require('express-validator')

module.exports.registerCaptain = async(req,res) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const {fullname, email, password, vehicle}= req.body
    const isCaptainExist = await captainModel.findOne({email})
    if(isCaptainExist){
        return res.status(400).json({message: 'Captain already exist with this email'})
    }
    const hashPassword = await captainModel.hashPassword(password)

    const captain = await CaptainService.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email : email,
        password : hashPassword,
        color : vehicle.color,
        capacity : vehicle.capacity,
        plate : vehicle.plate,
        vehicleType : vehicle.vehicleType
    })
    const token = captain.generateAuthToken()
    res.status(201).json({captain,token})
}

module.exports.loginCaptain = async(req,res) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const {email, password} = req.body
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(400).json({message: 'Invalid email or password'})
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid email or password'})
    }
    const token = captain.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({captain,token})
    
}

module.exports.getProfile = async(req,res) =>{
    try {
        if (!req.captain) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(req.captain);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }


}

module.exports.logoutCaptain = async(req,res) =>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token:token})
    res.clearCookie('token')
    res.status(200).json({message: 'Logged out successfully'})
}