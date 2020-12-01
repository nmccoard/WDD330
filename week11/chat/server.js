const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeaves, getRoomUsers } = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat Bot';

// Run when client connects
io.on('connection', socket => {
   //console.log('New Web Socket Connection...');

   socket.on('joinRoom', ({username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // Welcome current user
      socket.emit('message', formatMessage(botName, "Welcome to Nate's Chat!")); //sends a message to just the user

      // Broadcast when a user connects. 
      socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`)); //broadcast sends a message to everyone but the user

      io.to(user.room).emit('roomUsers', {
         room: user.room,
         users: getRoomUsers(user.room)
      });
   });

   // Listen for chat Message
   socket.on('chatMessage', msg => {
      //console.log(msg);
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit('message', formatMessage(user.username, msg));
   });

   // Run when client disconnects
   socket.on('disconnect', () => {
      const user = userLeaves(socket.id);

      if(user){
         io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`)); //io.emit() //send a message to everyone

         io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
         });
      }
   });   
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));