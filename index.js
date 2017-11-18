import {Board} from './src/Board';

var sizeInput;
var errorMessage;
var rootElement;
var board;

const startGame = (size) => board.init(size);

export const resetError = () => {
  errorMessage.style.display = 'none';
};

export const startClicked = () => {
  const size = parseInt(sizeInput.value, 10);
  if (sizeInput.value.match(/^\d+$/) && size > 0 && size % 2 === 0)
    startGame(sizeInput.value);
  else
    errorMessage.style.display = 'block';
};

export const init = () => {
  sizeInput = document.getElementById('size-input');
  errorMessage = document.getElementById('error-message');
  rootElement = document.getElementById('root');
  board = new Board(rootElement);
  startGame(sizeInput.value);
};

init();
