const axios = require('axios');
const apiURL = 'https://api.tronalddump.io/random/quote';

const handler = ({ channel, logger }, args) => {
  axios
    .get(apiURL)
    .then(function (response) {
      if (!args.length) {
        channel.send(response.data.value);
      }
    })
    .catch(function (error) {
      logger.error(error);
    });
};

module.exports = {
  handler,
  name: 'donald',
  init: () => 0,
};
