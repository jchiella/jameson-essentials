const Discord = require('discord.js');

const client = new Discord.Client();

const commands = {
  'ping': require('./commands/ping'),
  'comment': require('./commands/comment'),
  'compliment': require('./commands/compliment'),
};

const command_prefix = '$';

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.startsWith(command_prefix)) {
    const commandString = message.content.slice(1);    
    const commandParts = commandString.split(' ');
    const commandName = commandParts[0];
    const commandArgs = commandParts.slice(1);
    console.log('name:', commandName);
    console.log('args:', commandArgs);
    commandFunc = commands[commandName];
    if (commandFunc) {
      commands[commandName](message, commandArgs);
    }
  }
});

client.login(process.env.BOT_TOKEN);