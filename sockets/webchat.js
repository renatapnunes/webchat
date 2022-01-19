const moment = require('moment'); // bibli indicada pelo instrutor Ricci
const insert = require('../models/entity/insert');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('\n >>>>> ', socket.id, ' entrou \n');

    socket.emit('welcome', 'Welcome to webchat!');
    socket.emit('userId', `${socket.id}`);

    socket.on('message', async ({ chatMessage, nickname }) => {
      const msgDB = {
        message: chatMessage,
        nickname,
        timestamp: moment(new Date()).format('YYYY-MM-DD h:mm:ss a'),
      };
      await insert('messages', msgDB);
      
      const date = moment(new Date()).format('DD-MM-YYYY h:mm a');
      const msg = `${date} - ${nickname} ${chatMessage}`;

      io.emit('message', msg);
    });
  });
};
