// o uso do moment foi indicado pelo instrutor Ricci
const moment = require('moment');
const insert = require('../models/entity/insert');

let connectedUsers = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    connectedUsers.push({ id: socket.id, nickname: socket.id.slice(0, 16) });
    io.emit('connectedUsers', connectedUsers);

    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = moment(new Date()).format('DD-MM-YYYY h:mm a');
      await insert('messages', { message: chatMessage, nickname, timestamp: date });

      io.emit('message', `${date} - ${nickname} ${chatMessage}`);
    });

    socket.on('connectedUsers', (newNickname) => {
      const index = connectedUsers.findIndex(({ id }) => id === newNickname.id);
      connectedUsers[index] = newNickname;

      io.emit('connectedUsers', connectedUsers);
    });

    socket.on('disconnect', () => {
      connectedUsers = connectedUsers.filter(({ id }) => id !== socket.id);
      io.emit('connectedUsers', connectedUsers);
    });
  });
};
