const { dbUrl } = require('../globals');

const db = require('monk')(dbUrl);
const counters = db.get('counters');

const newCounter = (counter) => {
  counters.insert({ name: counter, count: 0 });
};

const deleteCounter = (counter) => {
  counters.remove({ name: counter });
};

const getCounter = async (counter) => {
  const doc = await counters.findOne({ name: counter });
  return doc.count;
};

const incrementCounter = (counter) => {
  counters.update({ name: counter }, { $inc: { count: 1 } });
};

const decrementCounter = (counter) => {
  counters.update({ name: counter }, { $inc: { count: -1 } });
};

const setCounter = (counter, number) => {
  counters.update({ name: counter }, { $set: { count: number } });
};

const handler = async ({ channel }, args) => {
  if (args.length === 1) {
    const counter = args.shift();
    channel.send(`The ${counter} counter is ${await getCounter(counter)}`);
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
      channel.send(`${counter} is now ${await getCounter(counter)}`);
    } else if (subcommand === '-') {
      decrementCounter(counter);
      channel.send(`${counter} is now ${await getCounter(counter)}`);
    } else if (subcommand === '=') {
      if (args.length) {
        let number;
        try {
          number = args.shift();
        } finally {
          setCounter(counter, parseInt(number));
          channel.send(`${counter} is now ${await getCounter(counter)}`);
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
