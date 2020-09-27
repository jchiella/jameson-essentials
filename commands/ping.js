const handler = ({ channel }) => {
  channel.send('pong');
}

module.exports = {
  handler,
  name: 'ping',
  init: () => _,
}