const counters = {};

const handler = ({ channel }, args) => {
  if (args.length >= 2) {
    const counter = args.shift();
    const subcommand = args.shift();
    if (subcommand === 'new') {
      counters[counter] = 0;
      channel.send(`Created new counter ${counter}`);
    } else if (subcommand === '+') {
      counters[counter] += 1;
      channel.send(`${counter} is now ${counters[counter]}`);
    } else if (subcommand === '-') {
      counters[counter] -= 1;
      channel.send(`${counter} is now ${counters[counter]}`);
    } else if (subcommand === '=') {
      if (args.length) {
        let number;
        try {
          number = args.shift();
        } finally {
          counters[counter] = number;
          channel.send(`${counter} is now ${counters[counter]}`);
        }
      }
    }
  }
}

module.exports = {
  handler,
  name: 'count',
  init: () => 0,
}