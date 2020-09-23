const axios = require('axios');

const complimentsURL = 'https://complimentr.com/api';

module.exports = (message, args) => {
  axios.get(complimentsURL)
    .then(function (response) {
      if (!args.length) {
        message.channel.send(response.data.compliment);
      } else if (args.length === 1) {
        const person = args[0];
        message.channel.send(`${person} ${response.data.compliment}`);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}