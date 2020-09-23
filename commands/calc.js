const axios = require('axios');

const apiURL = 'http://api.mathjs.org/v4/';

module.exports = (message, args) => {
  if (args.length > 0) {
    let math = args.join(' ');
    console.log('math: ', math);
    axios.get(apiURL, {
      params: {
        expr: math,
      },
    })
      .then(function (response) {
        message.channel.send(reponse.data);
      })
      .catch(function (error) {
        console.log(error);
        message.channel.send('Nope! That was not good math!');
      });
  }
}