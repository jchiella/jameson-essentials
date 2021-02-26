const { dbUrl } = require('../globals');

const db = require('monk')(dbUrl);
const counters = db.get('counters');

const newCounter = (counter) => {
  counters.insert(({ name: counter, count: 0 }));
};

const deleteCounter = (counter) => {
  counters.remove({ name: counter });
};

const getCounter = (counter) => {
  return counters.findOne({ name: counter }).then((doc) => doc.count);
};

const incrementCounter = async (counter) => {
  counters.update({ name: counter }, { count: getCounter(counter) + 1 });
};

const decrementCounter = async (counter) => {
  counters.update({ name: counter }, { count: getCounter(counter) - 1 });
};

const setCounter = async (counter, number) => {
  counters.update({ name: counter}, { count: number });
};

const handler = ({ channel }, args) => {
  if (args.length === 1) {
    const counter = args.shift();
    channel.send(`The ${counter} counter is ${getCounter(counter)}`);
  } else if (args.length >= 2) {
    const counter = args.shift();
    const subcommand = args.shift();
    if (subcommand === 'new') {
      newCounter(counter);
      channel.send(`Created new counter ${counter}`);
    } else if (subcommand === 'delete') {
      deleteCounter(counter);
    } else if (subcommand === '+') {
      incrementCounter(counter);
      channel.send(`${counter} is now ${getCounter(counter)}`);
    } else if (subcommand === '-') {
      decrementCounter(counter);
      channel.send(`${counter} is now ${getCounter(counter)}`);
    } else if (subcommand === '=') {
      if (args.length) {
        let number;
        try {
          number = args.shift();
        } finally {
          setCounter(counter, number);
          channel.send(`${counter} is now ${getCounter(counter)}`);
        }
      }
    }
  }
};

module.exports = {
  handler,
  name: 'count',
  init: () => 0,
};
