const socket = io();
const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.querySelector('#room-name');
const userList = document.querySelector('#users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
   ignoreQueryPrefix: true
});

//console.log(username, room);

// Join Chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
   outputRoomName(room);
   outputUsers(users);
});


// Messages form the Server
socket.on('message', message => {
   console.log(message);
   outPutMessage(message);

   // Auto Scroll down
   chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // get message text
   const msg = e.target.elements.msg.value;

   //console.log(msg);

   // Emit message to the server
   socket.emit('chatMessage', msg);

   // delete the text out of the input form
   e.target.elements.msg.value = "";
   e.target.elements.msg.focus();
});

// output message to DOM
function outPutMessage(note){
   const div = document.createElement('div');
   div.classList.add('note');
   div.innerHTML = `<p class="meta">${note.username} <span>${note.time}</span></p>
   <p class="text">${note.text}</p>`;
   document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
   roomName.innerText = room;
}

// Add user list to DOM
function outputUsers(users) {
   userList.innerHTML = `
      ${users.map(user => `<li>${user.username}</li>`).join('')}
   `;
}