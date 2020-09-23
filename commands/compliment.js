const axios = require('axios');

const { sayMention } = require('../utils');

const complimentsURL = 'https://complimentr.com/api';

module.exports = (message, args) => {
  axios.get(complimentsURL)
    .then(function (response) {
      if (args.length === 1) {
        const person = args[0];
        sayMention(message.client, message.channel, person, response.data.compliment);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}