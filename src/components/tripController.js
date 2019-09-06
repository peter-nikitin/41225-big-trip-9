import {unRender, render, Position, getDays} from '../utils';
import Event from './eventItem';
import EventEdit from './eventEdit';
import Sort from './sort';
import TripList from './tripList';
import TripDays from './tripDays';

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._noPoints = `<h2 class="visually-hidden">Trip events</h2><p class="trip-events__msg">Click New Event to create your first point</p>`;
    this._tirpList = new TripDays();
  }

  init() {
    const futurePoints = this._points.filter((day) => day.timeStart > Date.now());
    const sort = new Sort();
    render(this._container, this._tirpList.getElement(), Position.AFTERBEGIN);

    sort.getElement().addEventListener(`click`, (evt) => this._sortOnClick(evt));
    render(this._container, sort.getElement(), Position.AFTERBEGIN);
    if (futurePoints.length === 0) {
      this._container.getElement().innerHTML = this._noPoints;
    } else {
      this._renderTripDays(this._points);
    }

  }

  _renderTripDays(points) {
    [...getDays(points)].map((day, index) => {
      const currentDay = new TripList(day, index);
      const currentDatEventsList = currentDay.getElement().querySelector(`.trip-events__list`);
      points.filter((currentPoint) => `${new Date(currentPoint.timeStart).getFullYear()}-${new Date(currentPoint.timeStart).getMonth()}-${new Date(currentPoint.timeStart).getDate()}` === day)
        .map((currentPoints) => this._renderPoint(currentPoints, currentDatEventsList));

      render(this._tirpList.getElement(), currentDay.getElement(), Position.BEFOREEND);

    });
  }

  _renderPoint(mockPoint, container) {
    const event = new Event(mockPoint);
    const eventEdit = new EventEdit(mockPoint);

    const hideOnEsc = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._tirpList.getElement().replaceChild(
            event.getElement(),
            eventEdit.getElement()
        );
      }
    };

    event
      .getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._tirpList.getElement().replaceChild(
            eventEdit.getElement(),
            event.getElement()
        );
        document.addEventListener(`keydown`, hideOnEsc);
      });

    eventEdit
      .getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._tirpList.getElement().replaceChild(
            event.getElement(),
            eventEdit.getElement()
        );
        document.removeEventListener(`keydown`, hideOnEsc);
      });
    eventEdit
      .getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {
        this._tirpList.getElement().replaceChild(
            event.getElement(),
            eventEdit.getElement()
        );
        document.removeEventListener(`keydown`, hideOnEsc);
      });

    eventEdit
      .getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, () => {
        this._tirpList.getElement().replaceChild(
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

    render(container, event.getElement(), Position.BEFOREEND);
  }

  _sortOnClick(evt) {
    const target = evt.target;
    if (target.tagName !== `LABEL`) {
      return;
    }
    this._tirpList.getElement().innerHTML = ``;

    switch (target.dataset.sort) {
      case `sort-event`:
        const sortedByEvent = this._points.slice().sort((a, b) => {
          const nameA = a.action.type.toUpperCase(); // ignore upper and lowercase
          const nameB = b.action.type.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          return 1;
        });
        this._renderTripDays(sortedByEvent);
        break;
      case `sort-time`:
        const sortedByTime = this._points.slice().sort((a, b) => a.timeStart - b.timeStart);
        this._renderTripDays(sortedByTime);
        break;
      case `sort-price`:
        const sortedByPrice = this._points.slice().sort((a, b) => a.price - b.price);
        this._renderTripDays(sortedByPrice);
        break;
    }
  }
}
