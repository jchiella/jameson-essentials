const sayMention = (client, channel, person, text) => {
    const personID = person.slice(3, -1);
    const botID = getUserIDFromName(client, 'JamesonEssentials');

    if (person === 'me') {
      channel.send(text);
    } else if (personID === botID) {
      message.channel.send(`${message.author} ${text}`);
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