const app = require('./app')
const http = require('http');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
initializeSocket(server)
console.log(port);

server.listen(port);