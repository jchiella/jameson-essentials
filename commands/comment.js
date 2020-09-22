// Fun sarcastic comments

const cheerio = require('cheerio');
const axios = require('axios');

const commentsURL = 'https://www.joydeepdeb.com/misc/one-liners.html';
const comments = [];

axios.get(commentsURL)
  .then(function (response) {
    const $ = cheerio.load(response.data);
    $('blockquote').each((_, el) => comments.push($(el).text()));
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports = (message, args) => {
  const randomIndex = Math.floor(Math.random() * comments.length);
  if (!args.length) {
    message.channel.send(comments[randomIndex]);
  } else if (args.length === 1) {
    const person = args[0];
    const personID = person.slice(3, -1);
    const botID = message.client.users.cache.find(user => user.username == 'JamesonEssentials').id;
    if (personID === botID) {
      message.channel.send(`${message.author} ${comments[randomIndex]}`);
    } else {
      message.channel.send(`${person} ${comments[randomIndex]}`);
    }
  }
}