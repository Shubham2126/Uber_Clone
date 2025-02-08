const { cookie } = require("express-validator")
const userModel = require("../models/user.models")
const jwt = require('jsonwebtoken')
const captainModel = require('../models/captain.model')
const blacklistedToken = require('../models/blacklistToken.model')

module.exports.authUser = async(req,res, next)=>{
    const token =  req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({meessage:'Unauthorized'})
    }
    const isBlacklisted = await blacklistedToken.findOne({token:token})
    if(isBlacklisted){
        return res.status(401).json({meessage:'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRETS)
        const user = await userModel.findById(decoded._id)
        req.user = user
        return next();

    } catch (err) {
        res.status(401).json({meessage: "Unauthorized"})
    }

}

module.exports.authCaptain = async(req,res,next) =>{
    const token =  req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({meessage:'Unauthorized'})
        }
    const isBlacklisted = await blacklistedToken.findOne({token:token})
    if(isBlacklisted){
        return res.status(401).json({meessage:'Unauthorized'})
        }
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRETS)
            const captain = await captainModel.findById(decoded._id)  
            req.captain = captain
            return next();
            } catch (err) {
                res.status(401).json({meessage: "Unauthorized"})
                }

}