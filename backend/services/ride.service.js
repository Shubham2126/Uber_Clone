const { error } = require("console");
const rideModel = require("../models/ride.model");
const mapservice = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
}
  const distance = await mapservice.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 20,
    motorcycle: 10,
    car: 40,
  };
  const perKmRate = {
    auto: 10,
    motorcycle: 8,
    car: 15,
  };
  const perMinuteRate = {
    auto: 2,
    motorcycle: 1.5,
    car: 3,
  };
  return {
    auto:
      Math.round(baseFare.auto +
      perKmRate.auto * (distance.distance.value / 1000) +
      perMinuteRate.auto * (distance.duration.value / 60)),
    motorcycle:
      Math.round(baseFare.motorcycle +
      perKmRate.motorcycle * (distance.distance.value / 1000) +
      perMinuteRate.motorcycle * (distance.duration.value / 60)),
    car:
      Math.round(baseFare.car +
      perKmRate.car * (distance.distance.value / 1000) +
      perMinuteRate.car * (distance.duration.value / 60)),
  };
};
module.exports.getFare = getFare;
const otp = (num) => {
  return crypto.randomInt(Math.pow(10,num-1), Math.pow(10,num)).toString();
};
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: otp(6)
  });

  return ride;
};

module.exports.confirmRide = async({rideId, captain})=>{
  if(!rideId){
    throw new Error('rideId required')
  }

  await rideModel.findOneAndUpdate({_id: rideId},{status: 'accepted',captain: captain._id})
  const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp')

  return ride
}

module.exports.startRide =async({rideId, otp, captain})=>{
  const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp')
  if(!ride){
    throw new Error('Ride not found!')
  }
  if(otp !== ride.otp){
    throw new Error('Invalid Otp')
  }
  await rideModel.findOneAndUpdate({_id:rideId},{status: 'ongoing'})

  return ride
} 

module.exports.endRide = async({rideId, captain})=>{
  const ride = await rideModel.findOne({ _id: rideId, captain: captain._id}).populate('captain').populate('user')
  if(!ride){
    throw new Error('Ride not found!')
  }
  await rideModel.findOneAndUpdate({_id: rideId},{status:'completed'})
  return ride
}