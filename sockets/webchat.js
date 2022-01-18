const moment = require('moment'); // bibli indicada pelo instrutor Ricci

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} entrou`);

    socket.emit('welcome', 'Boas-vindas!');

    socket.on('message', ({ chatMessage, nickname }) => {
      console.log('chatMsg: ', chatMessage, ' | ', 'user: ', nickname);

      const date = moment(new Date()).format('DD-MM-YYYY h:mm a');
      const msg = `${date} - ${nickname} ${chatMessage}`;

      io.emit('message', msg);
    });
  });
};
