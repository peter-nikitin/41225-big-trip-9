
import AbstractComponent from './abstractComponent';

export default class Event extends AbstractComponent {
  constructor({action, city, timeStart, timeEnd, price, selectedOptions}) {
    super();
    this._action = action;
    this._city = city;
    this._timeStart = new Date(timeStart);
    this._timeEnd = new Date(timeEnd);
    this._price = price;
    this._selectedOptions = selectedOptions;
  }

  getTemplate() {
    return `
    <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${this._action.name.toLowerCase()}.png" alt="${this._action.name.toLowerCase()}">
      </div>
      <h3 class="event__title">${this._action.name} ${ this._action.type === `transfer` ? `to ` : `at `} ${this._city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${this._timeStart.toLocaleTimeString()}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${this._timeEnd.toLocaleTimeString()}</time>
        </p>
        <p class="event__duration">${this._timeStart - this._timeEnd.toLocaleTimeString()}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this._price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">

        ${this._selectedOptions.map((option) => `
          <li class="event__offer">
          <span class="event__offer-title">${option.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.cost}</span>
          </li>
        `).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`;
  }
}
