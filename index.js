const Discord = require('discord.js');
const { commandPrefix, botToken } = require('./globals');

const client = new Discord.Client();

const commands = {
  'ping': require('./commands/ping'),
  'comment': require('./commands/comment'),
  'compliment': require('./commands/compliment'),
  'calc': require('./commands/calc'),
  '8ball': require('./commands/8ball'),
  'choose': require('./commands/choose'),
  'donald': require('./commands/donald'),
  'unoreverse': require('./commands/unoreverse'),
  'hangman': require('./commands/hangman'),
};

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.startsWith(commandPrefix)) {
    const commandString = message.content.slice(1);    
    const commandParts = commandString.split(' ');
    const commandName = commandParts[0];
    const commandArgs = commandParts.slice(1);
    console.log('name:', commandName);
    console.log('args:', commandArgs);
    commandFunc = commands[commandName];
    if (commandFunc) {
      commandFunc(message, commandArgs);
    }
  }
});

client.login(botToken);