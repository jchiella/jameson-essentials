const axios = require('axios');

const hangmanPics = [
  String.raw`
  +---+
  |   |
      |
      |
      |
      |
=========`,
  String.raw`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  String.raw`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  String.raw`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  String.raw`
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========`,
  String.raw`
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========`,
  String.raw`
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========`,
];

let state = {
  gameInProgress: false,
  hiddenWord: '',
  guessedWord: [],
  failedGuesses: [],
  hangmanStage: 0,
};

const hangmanCutoff = 5;

const gameWin = ({ channel }) => {
  channel.send('You guys won!!! Yayayayay!');
  state.gameInProgress = false;
};

const gameLose = ({ channel }) => {
  channel.send('You guys lost. Game Over.');
  channel.send(`The word was ${state.hiddenWord}`);
  state.gameInProgress = false;
};

const sendState = ({ channel }) => {
  channel.send({
    embed: {
      title: 'Hangman',
      color: 5288419,
      fields: [
        {
          name: 'Word to Guess',
          value: state.guessedWord.join(' ').toUpperCase().replace(/_/g, '\\_'),
        },
        {
          name: 'Incorrect Guesses',
          value: state.failedGuesses.join(' ').toUpperCase() || 'None',
        },
        {
          name: 'Hangman Gallows',
          value: '```' + hangmanPics[state.hangmanStage] + '```',
        },
      ],
    },
  });
};

const subcommands = {
  start: async (params) => {
    const { channel } = params;
    let words = await axios
      .get(
        'https://raw.githubusercontent.com/Tom25/Hangman/master/wordlist.txt'
      )
      .then((res) => res.data.split('\n'));
    if (!state.gameInProgress) {
      state.gameInProgress = true;
      state.hiddenWord = words[Math.floor(Math.random() * words.length)];
      state.guessedWord = Array(state.hiddenWord.length).fill('_');
      state.failedGuesses = [];
      state.hangmanStage = 0;
      channel.send('Welcome to hangman!');
      sendState(params);
    } else {
      channel.send('Game already in progress!');
    }
  },
  guess: (params, args) => {
    const { channel } = params;
    if (args.length === 2) {
      const guess = args[1].toLowerCase();
      if (guess.length > 1) {
        channel.send('Just one letter guess please!');
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

      sendState(params);

      if (state.hangmanStage > hangmanCutoff) {
        gameLose(params);
      }

      let isWin = true;
      for (let i = 0; i < state.hiddenWord.length; i++) {
        if (state.guessedWord[i] !== state.hiddenWord[i]) {
          isWin = false;
        }
      }

      if (isWin) {
        gameWin(params);
      }
    }
  },
  stop: ({ channel }) => {
    if (state.gameInProgress) {
      state.gameInProgress = false;
      channel.send('Game stopped!');
    } else {
      channel.send('There is no game to stop!');
    }
  },
};

const handler = (params, args) => {
  if (args.length) {
    const subcommandName = args[0];
    const subcommand = subcommands[subcommandName];
    subcommand(params, args);
  }
};

module.exports = {
  handler,
  name: 'hangman',
  init: () => 0,
};
