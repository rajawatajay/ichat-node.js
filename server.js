//Node server which will handle socket io connections
const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000


server.listen(PORT, () =>{
    console.log(`listing on port ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});




// SOCKET WORK FOR SERVER

// const io = require('socket.io')(http)

io.on('connection', (socket) =>{
  console.log('connected...');

  socket.on('message', (msg)=>{
    socket.broadcast.emit('message', msg);
  });
});




