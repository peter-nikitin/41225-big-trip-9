import {unRender, render, Position, getDays} from '../utils';
import Event from '../components/eventItem';
import EventEdit from '../components/eventEdit';

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
          timeStart: new Date(Date.parse(formData.get(`event-start-time`))),
          timeEnd: new Date(Date.parse(formData.get(`event-end-time`))),
          price: this._point.price,
          selectedOptions: new Set(formData.getAll(`event-offer`).map((option) => ({name: option.split(`-`)[0], cost: option.split(`-`)[1]}))),
          isFavorite: this._point.isFavorite
        };

        console.log(Date.parse(formData.get(`event-start-time`)));
        console.log(newData.timeStart);
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
        eventEdit.removeElement();
        document.removeEventListener(`keydown`, hideOnEsc);
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
