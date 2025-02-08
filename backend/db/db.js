const mongoose = require('mongoose')

function connectDb() {
    mongoose.connect('mongodb://localhost:27017').then(()=>{
        console.log("connected to Db")
    }).catch(err => console.log(err))
}

module.exports = connectDb;