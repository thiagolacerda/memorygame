import {CardState} from './CardState';

export class GameController {
  constructor (boardSize, gameFinishedCallback) {
    this._faceUpCard = null;
    this._userCanInteract = true;
    this._twoCardsFlipped = false;
    this._gameFinishedCallback = gameFinishedCallback;
    this._numberOfCards = Math.pow(boardSize, 2);
  }

  onCardClicked (card) {
    if (card.state() !== CardState.Back || this._twoCardsFlipped || !this._userCanInteract)
      return;

    if (!this._faceUpCard)
      this._faceUpCard = card;
    else if (this._faceUpCard !== card)
      this._twoCardsFlipped = true;

    this._changeCardState(card, CardState.Flipped, this._onNewCardFlipped.bind(this), this._twoCardsFlipped);
  }

  _changeCardsState (cards, newState, callback, blockUserInput) {
    if (blockUserInput)
      this._userCanInteract = false;

    var count = cards.length;
    cards.forEach((card) => {
      card.setState(newState, () => {
        count--;
        if (count === 0) {
          if (blockUserInput)
            this._userCanInteract = true;
          callback(cards);
        }
      });
    });
  }

  _changeCardState (card, newState, callback, blockUserInput) {
    this._changeCardsState([card], newState, (cards) => callback(cards[0]), blockUserInput);
  }

  _onCardsUnmatch (cards) {
    this._changeCardsState(cards, CardState.Back, () => {}, true);
  }

  _onCardsMatch (cards) {
    this._changeCardsState(cards, CardState.Out, () => {
      this._numberOfCards -= 2;
      if (this._numberOfCards === 0)
        this._gameFinishedCallback();
    }, true);
  }

  _onNewCardFlipped (card) {
    if (this._faceUpCard === card)
      return;

    var newState = CardState.Unmatch;
    var callback = this._onCardsUnmatch.bind(this);
    if (this._faceUpCard.label() === card.label()) {
      newState = CardState.Match;
      callback = this._onCardsMatch.bind(this);
    }

    this._changeCardsState([this._faceUpCard, card], newState, callback, true);
    this._faceUpCard = null;
    this._twoCardsFlipped = false;
  }
}