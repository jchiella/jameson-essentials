const axios = require('axios');

const apiURL = 'http://api.mathjs.org/v4/';

const handler = ({ channel }, args) => {
  if (args.length > 0) {
    let math = args.join(' ');
    axios.get(apiURL, {
      params: {
        expr: math,
      },
    })
      .then(function (response) {
        channel.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
        channel.send('Nope! That was not good math!');
      });
  }
};

module.exports = {
  handler,
  name: 'calc',
  init: () => 0,
};