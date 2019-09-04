import {options, activity, citys} from '../data.js';
import AbstractComponent from './abstractComponent';

export default class EventEdit extends AbstractComponent {
  constructor({action, city, images, description, timeStart, timeEnd, price, selectedOptions, isFavorite}) {
    super();
    this._action = action;
    this._city = city;
    this._timeStart = new Date(timeStart);
    this._timeEnd = new Date(timeEnd);
    this._price = price;
    this._images = images;
    this._description = description;
    this._isFavorite = isFavorite;
    this._selectedOptions = selectedOptions;
  }

  getTemplate() {
    return `
    <li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._action.name.toLowerCase()}.png" alt="Event type icon">
          </label>

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">

            ${Object.keys(activity).map((ActivityType) => `
              <fieldset class="event__type-group">
                <legend class="visually-hidden">${ActivityType.charAt(0).toUpperCase() + ActivityType.slice(1)}</legend>
                ${activity[ActivityType].map((currentActivity) => `
                <div class="event__type-item">
                  <input id="event-type-${currentActivity.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentActivity.toLowerCase()}"
                  ${(currentActivity === this._action.name) ? `checked` : ``}
                  >
                  <label class="event__type-label  event__type-label--${currentActivity.toLowerCase()}" for="event-type-${currentActivity.toLowerCase()}-1">${currentActivity}</label>
                </div>
                `).join(``)}
                </fieldset>
              `).join(``)}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${this._action.name} ${(this._action.name === `transfer`) ? `to` : `at`}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${citys.map((currentCity) => `<option value="${currentCity}"></option>`).join(``)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._timeStart.toLocaleDateString()}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._timeEnd.toLocaleDateString()}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${options.map((option) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage"
            ${(new Set(this._selectedOptions.map((currentOpt) => currentOpt.name)).has(option.name)) ? `checked` : `` }
            >
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${option.name}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${option.cost}</span>
            </label>
          </div>
          `).join(``)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
          ${this._description}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${this._images.map((image) => `<img class="event__photo" src="${image}" alt="Event photo">`).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>
    </li>`;
  }
}

