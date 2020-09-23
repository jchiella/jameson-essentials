module.exports = (message, args) => {
  const choices = args.join(' ').split(',');
  const randomChoice = choices[Math.floor(Math.random() * comments.length)];
  message.channel.send(`Jameson Essentials has chosen. My choice is ${randomChoice}.`);
}