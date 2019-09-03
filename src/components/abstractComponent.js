import {createElement} from '../utils';

export default class AbstractComponent {
  constructor() {
    this._elem = null;
    if (new.target === AbstractComponent) {
      throw new Error(`Can not make instance of AbstractComponent`);
    }
  }

  getElement() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }

    return this._elem;
  }

  getTemplate() {
    throw new Error(`Class hasn't been implemented`);
  }

  removeElement() {
    if (this._elem) {
      this._elem = null;
    }
  }
}
