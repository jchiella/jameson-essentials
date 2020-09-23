const sayMention = (client, channel, person, asker, text) => {
    const personID = person.slice(3, -1);
    const botID = getUserIDFromName(client, 'JamesonEssentials');

    if (person === 'me' || personID === botID) {
      channel.send(`${asker} ${text}`);
    } else {
      channel.send(`${person} ${text}`);
    }
}

const getUserIDFromName = (client, name) => {
  return client.users.cache.find(user => user.username == name).id;
}

module.exports = {
  sayMention,
  getUserIDFromName,
}