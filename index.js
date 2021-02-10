const Discord = require('discord.js');
const winston = require('winston');
const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors());

const { commandPrefix, botToken, port } = require('./globals');

const client = new Discord.Client();

const commands = [
  require('./commands/ping'),
  require('./commands/comment'),
  require('./commands/compliment'),
  require('./commands/calc'),
  require('./commands/8ball'),
  require('./commands/choose'),
  require('./commands/donald'),
  require('./commands/unoreverse'),
  require('./commands/hangman'),
  require('./commands/count'),
];

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
})

client.on('ready', () => {
  logger.info('I am ready!');

  commands.forEach(command => {
    command.init(logger);
  });
});

client.on('message', message => {
  if (message.content.startsWith(commandPrefix)) {
    const commandString = message.content.slice(1);    
    const commandParts = commandString.split(' ');
    const commandName = commandParts[0];
    const commandArgs = commandParts.slice(1);
    logger.info(`Command run: ${commandPrefix}${commandName} with arguments ${commandArgs}`);
    const command = commands.find((c) => c.name === commandName);
    if (command) {
      command.handler({
        client: message.client,
        channel: message.channel,
        author: message.author,
        logger,
      }, commandArgs);
    }
  }
});

client.login(botToken);

app.get('/quotes', (req, res) => {
  client.channels.fetch('763508354076639274').then((chan) => {
    chan.messages.fetch({ limit: 100 }).then((msgs) => {
      res.json(msgs.map((msg) => {
        const pattern = /["“]?([^"]+)["”]?\s*-+\s*(\S+),?\s*(\S+)/g;
        const matches = pattern.exec(msg.content);
        if (matches === null) {
          console.log(`Unable to match with ${msg.content}`);
        } else {
          return {
            fullText: msg.content,
            quote: matches[1],
            quotedPerson: matches[2],
            time: matches[3],
            quotedBy: msg.author.username,
          };
        }
      }));
    });
  });
});

app.listen(port, () => {
  logger.info(`Express app listening on port ${port}`);
});