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

const newCounter = async (counter) => {
  await client.query(`INSERT INTO Counters (Name, Count) VALUES ('${counter}', 0);`);
};

const getCounter = async (counter) => {
  const result = await client.query(`SELECT Count FROM Counters WHERE Name='${counter}'`);
  return result.rows[0].count;
};

const incrementCounter = async (counter) => {
  await client.query(`UPDATE Counters SET Count = Count + 1 WHERE Name='${counter}';`);
};

const decrementCounter = async (counter) => {
  await client.query(`UPDATE Counters SET Count = Count + 1 WHERE Name='${counter}';`);
};

const setCounter = async (counter, number) => {
  await client.query(`UPDATE Counters SET Count = ${number} WHERE Name='${counter}';`);
};

const handler = async ({ channel }, args) => {
  if (args.length === 1) {
    const counter = args.shift();
    channel.send(`The ${counter} counter is ${await getCounter(counter)}`);
  } else if (args.length >= 2) {
    const counter = args.shift();
    const subcommand = args.shift();
    if (subcommand === 'new') {
      await newCounter(counter);
      channel.send(`Created new counter ${counter}`);
    } else if (subcommand === '+') {
      await incrementCounter(counter);
      channel.send(`${counter} is now ${await getCounter(counter)}`);
    } else if (subcommand === '-') {
      await decrementCounter(counter);
      channel.send(`${counter} is now ${await getCounter(counter)}`);
    } else if (subcommand === '=') {
      if (args.length) {
        let number;
        try {
          number = args.shift();
        } finally {
          await setCounter(counter, number);
          channel.send(`${counter} is now ${await getCounter(counter)}`);
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