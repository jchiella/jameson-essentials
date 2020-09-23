const apiURL = 'https://api.tronalddump.io/random/quote';

module.exports = (message, args) => {
  axios.get(apiURL)
    .then(function (response) {
      if (!args.length) {
        message.channel.send(response.data.value);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}