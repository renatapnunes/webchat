const express = require('express');
const http = require('http').createServer(express());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/webchat')(io);

http.listen(3000, () => {
  console.log('Server listening to port 3000');
});
