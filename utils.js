const sayMention = (client, channel, person, asker, text, img) => {
    const personID = person.slice(3, -1);
    const botID = getUserIDFromName(client, 'JamesonEssentials');

    if (person === 'me' || personID === botID) {
      if (img) {
        channel.send(`${asker} ${text}`, img);
      } else {
        channel.send(`${asker} ${text}`);
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