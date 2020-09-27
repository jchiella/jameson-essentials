const axios = require('axios');

const { sayMention } = require('../utils');

const complimentsURL = 'https://complimentr.com/api';

const handler = ({ client, channel, author, logger }, args) => {
  axios.get(complimentsURL)
    .then(function (response) {
      if (args.length === 1) {
        const person = args[0];
        sayMention(client, channel, person, author, response.data.compliment);
      }
    })
    .catch(function (error) {
      logger.error(error);
    });
}

module.exports = {
  handler,
  name: 'compliment',
  init: () => _,   
}