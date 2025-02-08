const socketIo = require('socket.io')
const userModel = require('./models/user.models')
const captainModel = require('./models/captain.model')

let io;
 
function initializeSocket(server){
    io = socketIo(server,{
        cors:{
            origin: '*',
            methods: ['GET','POST']
        }
    })
    io.on('connection',(socket) =>{
        console.log(`Client Connected ${socket.id}`);
        socket.on('join',async(data) => {
            const {userId, userType} = data
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,{
                    SocketId: socket.id
                })
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId,{
                    socketId: socket.id
                })
            }
        })
        socket.on('update-location', async(data)=>{
            const {userId, location} =data
            await captainModel.findByIdAndUpdate(userId,{
                location:{
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })
        socket.on('disconnect',()=>{
            console.log(`Client Disconnect ${socket.id}`);
        })
    })

}

function sendMessage(socketId, message){
    if(io){
        io.to(socketId).emit(message.event, message.data)
    }else{
        console.log('socket.io is not initialized');
    }
}

module.exports = {initializeSocket , sendMessage}