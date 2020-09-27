const { MessageAttachment } = require('discord.js');
const { sayMention } = require('../utils');

const handler = ({ client, channel, author }, args) => {
  if (args.length === 1) {
    const card = new MessageAttachment('https://media1.tenor.com/images/33a31a4dd127a4b3df84887c5351ed4b/tenor.gif');
    const person = args[0];
    sayMention(client, channel, person, author, '', card);
  }
}

module.exports = {
  handler,
  name: 'unoreverse',
  init: () => _,
}