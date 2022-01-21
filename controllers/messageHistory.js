const findAll = require('../models/entity/findAll');

module.exports = async (_req, res) => {
  try {
    const messageHistory = await findAll('messages');

    const messages = messageHistory.map(({ message, nickname, timestamp }) =>
      `${timestamp} - ${nickname} ${message}`);

    return res.render('webchat', { messages });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
