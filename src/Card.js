import {AnimationHelper} from './AnimationHelper';
import {CardState} from './CardState';
import {Constants} from './Constants';

export class Card {
  constructor (id, label, parentElement, gameController, cardSize) {
    this._id = id;
    this._label = label;
    this._container = null;
    this._flipper = null;
    this._parentElement = parentElement;
    this._state = CardState.Back;
    this._controller = gameController;
    this._render(cardSize);
  }

  label () {
    return this._label;
  }

  state () {
    return this._state;
  }

  setState (newState, done) {
    if (this._state === newState || !this._isTransitionValid(newState))
      return done(this);

    if (newState === CardState.Back) {
      AnimationHelper.unflip(this._flipper, () => this._doSetState(newState, done));
    } else if (newState === CardState.Flipped) {
      AnimationHelper.flip(this._flipper, () => this._doSetState(newState, done));
    } else if (newState === CardState.Match) {
      AnimationHelper.match(this._flipper.firstElementChild, () => this._doSetState(newState, done));
    } else if (newState === CardState.Unmatch) {
      AnimationHelper.unmatch(this._flipper.firstElementChild, () => this._doSetState(newState, done));
    } else {
      this._container.removeChild(this._flipper);
      this._doSetState(newState, done);
    }
  }

  _isTransitionValid (newState) {
    switch (newState) {
    case CardState.Back:
      return this._state === CardState.Flipped || this._state === CardState.Unmatch;
    case CardState.Flipped:
      return this._state === CardState.Back;
    case CardState.Match:
    case CardState.Unmatch:
      return this._state === CardState.Flipped;
    case CardState.Out:
      return this._state === CardState.Match;
    default:
      return false;
    }
  }

  _doSetState (newState, done) {
    this._state = newState;
    done(this);
  }

  _render (cardSize) {
    const pxSize = `${cardSize}px`;
    this._container = document.createElement('div');
    this._container.setAttribute('id', this._id);
    this._container.className = 'cardcontainer';
    this._container.style = `width: ${pxSize}; height: ${pxSize};`;
    this._container.addEventListener('click', () => this._controller.onCardClicked(this));

    this._flipper = document.createElement('div');
    this._flipper.className = 'containerflipper';
    this._container.appendChild(this._flipper);

    const cardStyle = `line-height: ${pxSize}; font-size: ${cardSize * 0.4}px;`;
    const front = document.createElement('div');
    front.className = 'card front';
    front.style = cardStyle;
    front.innerHTML = this._label;
    this._flipper.appendChild(front);

    const back = document.createElement('div');
    back.className = 'card back';
    back.style = cardStyle;
    back.innerHTML = Constants.CARD_BACK_IMAGE;
    this._flipper.appendChild(back);

    this._parentElement.appendChild(this._container);
  }
}
