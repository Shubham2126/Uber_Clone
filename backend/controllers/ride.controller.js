const rideService = require("../services/ride.service");
const mapService = require('../services/maps.service')
const { validationResult } = require('express-validator');
const { sendMessage } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;
  
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);
    const pickupCoords = await mapService.getAddressCordinates(pickup)


    const captainAvailable = await mapService.getCaptainInRadius(pickupCoords.latitude, pickupCoords.longitude, 5)

    const rideWithUser = await rideModel.findOne({_id:ride._id}).populate('user')

    captainAvailable.map(captain=>{
      sendMessage(captain.socketId,{
        event: 'new-ride',
        data: rideWithUser
      })
    })
    


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async(req,res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const {pickup,destination} = req.query;

  try{
    const fare = await  rideService.getFare(pickup,destination)
    res.status(200).json(fare)
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

module.exports.confirmRide = async(req,res)=>{
  const {rideId} = req.body

  try {
    const ride = await rideService.confirmRide({rideId,captain: req.captain})
    res.status(200).json(ride)

    sendMessage(ride.user.SocketId,{
      event: 'ride-confirmed',
      data: ride
    })

  } catch (error) {
    res.status(500).json({message: error})

  }

}

module.exports.startRide = async(req,res)=>{
  const {rideId, otp} =req.body
  console.log(rideId);

  try {
    const ride  = await rideService.startRide({rideId, otp, captain: req.captain})
    sendMessage(ride.user.SocketId, {
      event: 'ride-started',
      data: ride
    })
    res.status(200).json(ride)
  } catch (error) {
    res.status(500).json({message: error})
    console.log(error);
  }
}

module.exports.endRide = async(req,res)=>{
  const {rideId} = req.body
  try {
    console.log(rideId,req.captain);
    const ride = await rideService.endRide({rideId, captain: req.captain})
    console.log(ride);
    sendMessage(ride.user.SocketId,{
      event: 'end-ride',
      data: ride
    })
    res.status(200).json(ride)
  } catch (error) {
    res.status(500).json({message: error})
    console.log(error);
    
  }
  
  
}