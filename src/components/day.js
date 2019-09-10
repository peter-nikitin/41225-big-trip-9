import AbstractComponent from './abstractComponent';

export default class Day extends AbstractComponent {
  constructor(date, dayCount) {
    super();
    this._dayCount = dayCount;
    this._date = new Date(date);
  }

  getTemplate() {
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._dayCount + 1}</span>
        <time class="day__date" datetime="${this._date.toDateString()}">${this._date.toDateString()}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
      </li>`;
  }
}
