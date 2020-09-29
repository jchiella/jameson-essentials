const sayMention = ({ client, channel, author}, person, text, img) => {
    const personID = mentioned.slice(3, -1);
    const botID = getUserIDFromName(client, 'JamesonEssentials');

    if (person === 'me' || personID === botID) {
      if (img) {
        channel.send(`${author} ${text}`, img);
      } else {
        channel.send(`${author} ${text}`);
      }
    } else {
      if (img) {
        channel.send(`${person} ${text}`, img);
      } else {
        channel.send(`${person} ${text}`);
      }
    }
}

const getUserIDFromName = (client, name) => {
  return client.users.cache.find(user => user.username == name).id;
}

module.exports = {
  sayMention,
  getUserIDFromName,
}