// Fun sarcastic comments

const cheerio = require('cheerio');
const axios = require('axios');

const { sayMention } = require('../utils');
const commentsURL = 'https://www.joydeepdeb.com/misc/one-liners.html';
const comments = [];

const init = (logger) =>
  axios
    .get(commentsURL)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      $('blockquote').each((_, el) => comments.push($(el).text()));
    })
    .catch(function (error) {
      logger.error(error);
    });

const handler = (params, args) => {
  const randomIndex = Math.floor(Math.random() * comments.length);
  if (!args.length) {
    params.channel.send(comments[randomIndex]);
  } else if (args.length === 1) {
    const person = args[0];
    sayMention(params, person, comments[randomIndex]);
  }
};

module.exports = {
  handler,
  name: 'comment',
  init,
};
