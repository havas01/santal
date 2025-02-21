const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
}));
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
io.on("connection", (socket) => {
    console.log(`a user connected : ${socket.id}`);
    socket.on('message', (message) => {
        console.log(message);
        socket.broadcast.emit('receive_message', message);
    });
})
server.listen(4000, () => {
  console.log('http://localhost:4000');
});