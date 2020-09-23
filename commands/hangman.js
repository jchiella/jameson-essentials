const axios = require('axios');
const { StreamDispatcher } = require('discord.js');

let words = axios.get('https://raw.githubusercontent.com/Tom25/Hangman/master/wordlist.txt')
  .then((res) => res.data.split('\n'));

let state = {
  gameInProgress: false,
  hiddenWord: '',
  guessedWord: '',
  failedGuesses: [],
  hangmanStage: 0,
}

const hangmanCutoff = 7;

const sendState = (message) => {
  message.channel.send(`State: ${state}`);
}

const subcommands = {
  'start': (message, args) => {
    if (!state.gameInProgress) {
      state.gameInProgress = true;
      state.hiddenWord = words[Math.floor(Math.random() * words.length)];
      state.guessedWord = '-'.repeat(state.hiddenWord.length);
      state.failedGuesses = [];
      state.hangmanStage = 0;
      message.channel.send('Welcome to hangman!');
      sendState(message);
    } else {
      message.channel.send('Game already in progress!');
    }
  },
  'guess': (message, args) => {
    if (args.length === 2) {
      const guess = args[1];
      if (guess.length > 1) {
        message.channel.send('Just one letter guess please!');
        return;
      } else {
        let hasGuess = false;
        for (let i = 0; i < state.hiddenWord.length; i++) {
          if (state.hiddenWord[i] === guess) {
            hasGuess = true;
            state.guessedWord[i] = guess;
          }
        }
        if (!hasGuess) {
          state.failedGuesses.push(guess);
        }
      }

      state.hangmanStage += 1;
      if (state.hangmanStage > hangmanCutoff) {
        gameLose(message);
      }

      if (state.guessedWord === state.hiddenWord) {
        gameWin(message);
      }
    }
  },
  'stop': (message, args) => {
    if (state.gameInProgress) {
      state.gameInProgress = false;
      message.channel.send('Game stopped!');
    } else {
      message.channel.send('There is no game to stop!');
    }
  },
}

const gameWin = (message) => {
  message.channel.send('You guys won!!! Yayayayay!');
  state.gameInProgress = false;
}

const gameLose = (message) => {
  message.channel.send('You guys lost. Game Over.');
  message.channel.send(`The word was ${state.hiddenWord}`);
  state.gameInProgress = false;
}

module.exports = (message, args) => {
  if (args.length) {
    const subcommandName = args[0];
    const subcommand = subcommands[subcommandName];
    subcommand(message, args);
  }
}