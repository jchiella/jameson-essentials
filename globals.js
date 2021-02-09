const botToken = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;
const commandPrefix = '$';

module.exports = {
  botToken,
  commandPrefix,
  port,
}