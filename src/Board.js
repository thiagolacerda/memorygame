import {Card} from './Card';
import {Constants} from './Constants';
import {GameController} from './GameController';

export class Board {
  constructor (parentElement) {
    this._size = 0;
    this._parentElement = parentElement;
    this._boardRoot = null;
    this._controller = null;
    this._cards = {};
  }

  init (size) {
    this._size = size;
    this._controller = new GameController(this._size, this._onGameFinished.bind(this));
    this._cards = {};

    if (this._boardRoot) {
      this._parentElement.removeChild(this._boardRoot);
      this._boardRoot = null;
    }

    this._render();
  }

  _onGameFinished () {
    this._boardRoot.firstElementChild.style.opacity = 1;
    this._parentElement.style.backgroundColor = Constants.FINAL_BOARD_COLOR;
  }

  _render () {
    this._parentElement.style.backgroundColor = Constants.INITIAL_BOARD_COLOR;
    this._cards = {};
    const cardValues = this._buildShuffledCardBoard();
    this._boardRoot = document.createElement('div');
    this._boardRoot.style.position = 'relative';

    const youOwnMessage = document.createElement('div');
    youOwnMessage.className = 'you-won-message content-center-aligned-div';
    youOwnMessage.innerHTML = Constants.FINAL_MESSAGE;
    this._boardRoot.appendChild(youOwnMessage);
    const baseSize = Math.min(this._parentElement.clientWidth, this._parentElement.clientHeight);
    const cardSize = Math.floor(Math.max(Constants.MIN_CARD_SIZE, Math.min(baseSize * Constants.CARD_PERCENTAGE, Constants.MAX_CARD_SIZE)));

    for (var i = 0; i < this._size; i++) {
      const cardsRow = document.createElement('div');
      cardsRow.className = 'cardsrow';
      for (var j = 0; j < this._size; j++) {
        const id = i + '_' + j;
        this._cards[id] = new Card(id, String.fromCodePoint(cardValues[j + (i * this._size)]), cardsRow, this._controller, cardSize);
      }
      this._boardRoot.appendChild(cardsRow);
    }
    this._parentElement.appendChild(this._boardRoot);
  }

  _buildShuffledCardBoard () {
    const numberOfCards = this._size * this._size;
    const cards = [];
    for (var i = 0; i < numberOfCards;) {
      cards.push(Constants.FIRST_CARD_VALUE + i);
      cards.push(Constants.FIRST_CARD_VALUE + i);
      i += 2;
    }

    this._shuffleCards(cards);

    return cards;
  }

  _shuffleCards (cards) {
    for (var i = cards.length - 1; i > 0; i--) {
      var index = Math.floor(Math.random() * (i + 1));
      const temp = cards[index];
      cards[index] = cards[i];
      cards[i] = temp;
    }
  }
}
