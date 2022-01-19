const moment = require('moment');
const findAll = require('../models/entity/findAll');

module.exports = async (_req, res) => {
  try {
    const messageHistory = await findAll('messages');

    const messages = messageHistory.map(({ message, nickname, timestamp }) => {
      const date = moment(new Date(timestamp)).format('DD-MM-YYYY h:mm a');
      return `${date} - ${nickname} ${message}`;
    });
    
    console.log('messages:', messages);

    return res.render('webchat', { messages });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
