import {unRender, render, Position} from '../utils';
import Event from '../components/eventItem';
import EventEdit from '../components/eventEdit';
import flatpickr from 'flatpickr';

export default class PointController {
  constructor(point, container, onViewChange, onDataChange) {
    this._point = point;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._event = new Event(this._point);
    this._eventEdit = new EventEdit(this._point);
    this.init();
  }

  init() {

    const hideOnEsc = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(
            this._event.getElement(),
            this._eventEdit.getElement()
        );
      }
    };

    this._event
      .getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onViewChange();
        this._container.replaceChild(
            this._eventEdit.getElement(),
            this._event.getElement()
        );
        document.addEventListener(`keydown`, hideOnEsc);
      });

    this._eventEdit
      .getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(
            this._event.getElement(),
            this._eventEdit.getElement()
        );
        document.removeEventListener(`keydown`, hideOnEsc);
      });
    this._eventEdit
      .getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._eventEdit.getElement().querySelector(`.event--edit`));
        const newData = {
          action: formData.get(`event-type`),
          city: formData.get(`event-destination`),
          images: this._point.images,
          description: this._point.description,
          timeStart: formData.get(`event-start-time`),
          timeEnd: formData.get(`event-end-time`),
          price: this._point.price,
          selectedOptions: new Set(formData.getAll(`event-offer`).map((option) => ({name: option.split(`-`)[0], cost: option.split(`-`)[1]}))),
          isFavorite: formData.get(`event-favorite`)
        };
        this._onDataChange(newData, this._point);

        this._container.replaceChild(
            this._event.getElement(),
            this._eventEdit.getElement()
        );

        document.removeEventListener(`keydown`, hideOnEsc);
      });

    this._eventEdit
      .getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, () => {
        this._container.replaceChild(
            this._event.getElement(),
            this._eventEdit.getElement()
        );
        document.removeEventListener(`keydown`, hideOnEsc);
      });

    this._eventEdit
      .getElement()
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        unRender(this._eventEdit.getElement());
        this._eventEdit.removeElement();
      });

    flatpickr(this._eventEdit
    .getElement()
    .querySelector(`#event-start-time-1`), {
      altInput: true,
      altFormat: `d/m/y H:i`,
      // dateFormat: `Y-m-d H:i:s`,
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      defaultDate: this._point.timeStart
    });

    flatpickr(this._eventEdit
    .getElement()
    .querySelector(`#event-end-time-1`), {
      altInput: true,
      altFormat: `d/m/y H:i`,
      // dateFormat: `Y-m-d H:i:s`,
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      defaultDate: this._point.timeEnd
    });


    render(this._container, this._event.getElement(), Position.BEFOREEND);

  }

  setDefaultView() {
    if (this._container.contains(this._eventEdit.getElement())) {
      this._container.replaceChild(
          this._event.getElement(),
          this._eventEdit.getElement()
      );
    }
  }
}
