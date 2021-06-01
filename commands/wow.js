const handler = ({ channel, client, discordBtns }) => {
  let btnYes = new discordBtns.MessageButton()
    .setLabel('Yes!')
    .setStyle('green')
    .setID('yes');

  let btnNo = new discordBtns.MessageButton()
    .setLabel('No!')
    .setStyle('green')
    .setID('no');

  let row = new discordBtns.MessageActionRow()
    .addComponent(btnYes)
    .addComponent(btnNo);
  channel.send('Wow, did you know that Discord now has buttons?', {
    component: row,
  });

  client.on('clickButton', async (button) => {
    if (button.replied) {
      await button.reply.send('You already clicked me, dummy!', true);
    } else if (button.id === 'yes') {
      await button.reply.send('Congratulations!', true);
    } else if (button.id === 'no') {
      await button.reply.send('Oh nooooooo!', true);
    }
  });
};

module.exports = {
  handler,
  name: 'wow',
  init: () => 0,
};
