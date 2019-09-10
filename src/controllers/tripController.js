import {unRender, render, Position, getDays} from '../utils';
import Sort from '../components/sort';
import Day from '../components/day';
import TripDays from '../components/tripDays';
import PointController from './pointController';

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._noPoints = `<h2 class="visually-hidden">Trip events</h2><p class="trip-events__msg">Click New Event to create your first point</p>`;
    this._tirpList = new TripDays();
    this._subscriptions = [];
    this._onViewChange = this._onViewChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    const futurePoints = this._points.filter((day) => day.timeStart > Date.now());
    const sort = new Sort();


    sort.getElement().addEventListener(`click`, (evt) => this._sortOnClick(evt));
    render(this._container, sort.getElement(), Position.AFTERBEGIN);
    if (futurePoints.length === 0) {
      this._container.innerHTML = this._noPoints;
    } else {
      this._renderTripDays(this._points);
    }

  }

  _renderTripDays(points) {
    unRender(this._tirpList.getElement());
    this._tirpList.removeElement();
    render(this._container, this._tirpList.getElement(), Position.BEFOREEND);
    [...getDays(points)].map((day, index) => {
      const currentDay = new Day(day, index);
      const currentDatEventsList = currentDay.getElement().querySelector(`.trip-events__list`);
      points.filter((currentPoint) => new Date(currentPoint.timeStart).toDateString() === day)
        .map((currentPoints) => this._renderPoint(currentPoints, currentDatEventsList));

      render(this._tirpList.getElement(), currentDay.getElement(), Position.BEFOREEND);

    });
  }

  _renderPoint(point, container) {
    const pointController = new PointController(point, container, this._onViewChange, this._onDataChange);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _onViewChange() {
    this._subscriptions.forEach((setDefaultView) => setDefaultView());
  }

  _onDataChange(newData, oldData) {
    this._points[this._points.findIndex((oldDataInArray) => oldData === oldDataInArray)] = newData;
    this._renderTripDays(this._points);
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
          const nameA = a.action.toUpperCase(); // ignore upper and lowercase
          const nameB = b.action.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          return 1;
        });
        this._renderTripDays(sortedByEvent);
        break;
      case `sort-time`:
        const sortedByTime = this._points.slice().sort((a, b) => +a.timeStart - +b.timeStart);
        this._renderTripDays(sortedByTime);
        break;
      case `sort-price`:
        const sortedByPrice = this._points.slice().sort((a, b) => a.price - b.price);
        this._renderTripDays(sortedByPrice);
        break;
    }
  }


}
