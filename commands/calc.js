const axios = require('axios');

const apiURL = 'http://api.mathjs.org/v4/';

module.exports = (message, args) => {
  if (args.length > 0) {
    axios.get(apiURL, {
      params: {
        expr: args.join(' '),
      },
    })
      .then(function (response) {
        message.channel.send(reponse.data);
      })
      .catch(function (error) {
        message.channel.send('Nope! That was not good math!');
      });
  }
}