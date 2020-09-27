const handler = ({ channel }, args) => {
  const choices = args.join(' ').split(',');
  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  channel.send(`Jameson Essentials has chosen. My choice is ${randomChoice}.`);
}

module.exports = {
  handler,
  name: 'choose',
  init: () => _,
}