const moment = require('moment'); // bibli indicada pelo instrutor Ricci

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('\n >>>>> ', socket.id, ' entrou \n');

    socket.emit('welcome', 'Welcome to webchat!');
    socket.emit('userId', `${socket.id}`);

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = moment(new Date()).format('DD-MM-YYYY h:mm a');
      const msg = `${date} - ${nickname} ${chatMessage}`;

      console.log('\n msg: \n', msg, '\n');

      io.emit('message', msg);
    });
  });
};
