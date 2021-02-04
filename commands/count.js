const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
});

const init = () => {
  client.connect();
};

const newCounter = (counter) => {
  await client.query(`INSERT INTO Counters (Name, Count) VALUES ('${counter}', 0);`);
};

const getCounter = (counter) => {
  const result = await client.query(`SELECT Count FROM Counters WHERE Name='${counter}'`);
  console.log(result);
  return 101;
};

const incrementCounter = (counter) => {
  await client.query(`UPDATE Counters SET Count = Count + 1 WHERE Name='${counter}';`);
};

const decrementCounter = (counter) => {
  await client.query(`UPDATE Counters SET Count = Count + 1 WHERE Name='${counter}';`);
};

const setCounter = (counter, number) => {
  await client.query(`UPDATE Counters SET Count = ${number} WHERE Name='${counter}';`);
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
  init,
}