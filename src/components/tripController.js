import {unRender, render, Position} from '../utils';
import Event from './eventItem';
import EventEdit from './eventEdit';

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._noPoints = `<h2 class="visually-hidden">Trip events</h2><p class="trip-events__msg">Click New Event to create your first point</p>`;
  }

  init() {
    const renderPoint = (mockPoint) => {
      const event = new Event(mockPoint);
      const eventEdit = new EventEdit(mockPoint);

      const hideOnEsc = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          this._container.replaceChild(
              event.getElement(),
              eventEdit.getElement()
          );
        }
      };

      event
        .getElement()
        .querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, () => {
          this._container.replaceChild(
              eventEdit.getElement(),
              event.getElement()
          );
          document.addEventListener(`keydown`, hideOnEsc);
        });

      eventEdit
        .getElement()
        .querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, () => {
          this._container.replaceChild(
              event.getElement(),
              eventEdit.getElement()
          );
          document.removeEventListener(`keydown`, hideOnEsc);
        });
      eventEdit
        .getElement()
        .querySelector(`.event__save-btn`)
        .addEventListener(`click`, () => {
          this._container.replaceChild(
              event.getElement(),
              eventEdit.getElement()
          );
          document.removeEventListener(`keydown`, hideOnEsc);
        });

      eventEdit
        .getElement()
        .querySelector(`form`)
        .addEventListener(`submit`, () => {
          this._container.replaceChild(
              event.getElement(),
              eventEdit.getElement()
          );
          document.removeEventListener(`keydown`, hideOnEsc);
        });

      eventEdit
        .getElement()
        .querySelector(`.event__reset-btn`)
        .addEventListener(`click`, () => {
          unRender(eventEdit.getElement());
          eventEdit.removeElement();
          document.removeEventListener(`keydown`, hideOnEsc);
        });

      render(this._container, event.getElement(), Position.BEFOREEND);
    };

    const futurePoints = this._points.filter((day) => day.timeStart > Date.now());

    if (futurePoints.length === 0) {
      this._container.innerHTML = `<h2 class="visually-hidden">Trip events</h2><p class="trip-events__msg">Click New Event to create your first point</p>`;
    } else {
      this._points.map((point) => renderPoint(point));
    }
  }
}
