const axios = require('axios');


let state = {
  gameInProgress: false,
  hiddenWord: '',
  guessedWord: [],
  failedGuesses: [],
  hangmanStage: 0,
}

const hangmanCutoff = 7;

const gameWin = (message) => {
  message.channel.send('You guys won!!! Yayayayay!');
  state.gameInProgress = false;
}

const gameLose = (message) => {
  message.channel.send('You guys lost. Game Over.');
  message.channel.send(`The word was ${state.hiddenWord}`);
  state.gameInProgress = false;
}

const sendState = (message) => {
  message.channel.send(`
   In progress: ${state.gameInProgress},
   hidden word: ${state.hiddenWord},
   guessed word: ${state.guessedWord},
   failed guesses: ${state.failedGuesses},
   hangmanStage: ${state.hangmanStage}`);
}

const subcommands = {
  'start': async (message, args) => {
    let words = await axios.get('https://raw.githubusercontent.com/Tom25/Hangman/master/wordlist.txt')
      .then((res) => res.data.split('\n'));
    console.log(words[0]);
    if (!state.gameInProgress) {
      state.gameInProgress = true;
      state.hiddenWord = words[Math.floor(Math.random() * words.length)];
      console.log(state.hiddenWord);
      state.guessedWord = '-'.repeat(state.hiddenWord.length);
      state.guessedWord = Array(state.hiddenWord.length).fill('-');
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
      console.log('guess', guess);
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
          if (!state.failedGuesses.includes(guess)) {
            state.failedGuesses.push(guess);
            state.hangmanStage += 1;
          }
        }
      }

      sendState(message);

      if (state.hangmanStage > hangmanCutoff) {
        gameLose(message);
      }

      let isWin = true;
      for (let i = 0; i < state.hiddenWord.length; i++) {
        if (state.guessedWord[i] !== state.hiddenWord[i]) {
          isWin = false;
        }
      }

      if (isWin) {
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

module.exports = (message, args) => {
  if (args.length) {
    const subcommandName = args[0];
    const subcommand = subcommands[subcommandName];
    subcommand(message, args);
  }
}