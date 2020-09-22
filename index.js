const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client();

const commands = {
  'ping': require('./commands/ping'),
};

const command_prefix = '$';

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.startsWith(command_prefix)) {
    const command = message.content.slice(1);    
    commands[command](message);
  }
});

client.login(process.env.BOT_TOKEN);