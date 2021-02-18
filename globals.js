require('dotenv').config();

const botToken = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;
const commandPrefix = '$';
const dbUrl = process.env.DB_URL;

module.exports = {
  botToken,
  commandPrefix,
  port,
  dbUrl,
}
