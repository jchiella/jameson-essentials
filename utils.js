const sayMention = ({ client, channel, mentioned, mentioner }, text, img) => {
    const personID = person.slice(3, -1);
    const botID = getUserIDFromName(client, 'JamesonEssentials');

    if (person === 'me' || personID === botID) {
      if (img) {
        channel.send(`${mentioner} ${text}`, img);
      } else {
        channel.send(`${mentioner} ${text}`);
      }
    } else {
      if (img) {
        channel.send(`${mentioned} ${text}`, img);
      } else {
        channel.send(`${mentioned} ${text}`);
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