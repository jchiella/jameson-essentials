const Discord = require('discord.js');
const winston = require('winston');

const { commandPrefix, botToken } = require('./globals');

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
];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
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