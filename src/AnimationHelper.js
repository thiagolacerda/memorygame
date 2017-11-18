export class AnimationHelper {
  static flip (element, done) {
    AnimationHelper._transition(element, 'flipped', null, done);
  }

  static unflip (element, done) {
    AnimationHelper._transition(element, null, 'flipped', done);
  }

  static match (element, done) {
    AnimationHelper._animate(element, 'match', null, () => {
      AnimationHelper._addRemoveClass(element, null, 'match');
      done();
    });
  }

  static unmatch (element, done) {
    AnimationHelper._animate(element, 'unmatch', null, () => {
      AnimationHelper._addRemoveClass(element, null, 'unmatch');
      done();
    });
  }

  static _transition (element, classToAdd, classToRemove, done) {
    element.addEventListener('transitionend', done, {once: true});
    AnimationHelper._addRemoveClass(element, classToAdd, classToRemove);
  }

  static _animate (element, classToAdd, classToRemove, done) {
    element.addEventListener('animationend', done, {once: true});
    AnimationHelper._addRemoveClass(element, classToAdd, classToRemove);
  }

  static _addRemoveClass (element, classToAdd, classToRemove) {
    if (classToAdd)
      element.classList.add(classToAdd);

    if (classToRemove)
      element.classList.remove(classToRemove);
  }
}
