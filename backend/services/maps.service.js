const axios = require('axios');
const captainModel = require('../models/captain.model')
const apiKey = process.env.GOOGLE_MAPS_API

module.exports.getAddressCordinates = async(address)=>{
    

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: address,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

}
module.exports.getDistanceTime = async(origin,destination) =>{
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
           return response.data.rows[0].elements[0];
            
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err)
        throw err
    }

}
module.exports.getSuggestions = async(input) =>{
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
            params: {
                input: input,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(err)
        throw err
        
    }
}
module.exports.getCaptainInRadius = async(ltd,lng, radius)=>{
    const captain = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere: [[ltd, lng], radius/ 3900]
            }
        }
    })
    return captain
}