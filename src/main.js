import {tripInfo as tripInfoLayout} from './components/tripInfo.js';
import {menu as menuLayout} from './components/menu.js';
import {filtersLayout} from './components/filters.js';

import Event from './components/eventItem';
import EventEdit from './components/eventEdit';

import {sort as sortLayout} from './components/sort.js';
import {getPoint, getFilter, getTripInfo, getDays} from './data.js';
import {renderTripDay} from './renderTripDay.js';
import {render, Position, unRender} from './utils';

const mockPoints = new Array(3).fill(``).map(() => getPoint(Math.floor(Math.random() * 100), {type: `activity`, number: 2}));

const getTotal = (points) => {
  let total = 0;
  points.map((point) => {
    total += point.price;
    point.selectedOptions.map((option) => {
      if (option) {
        total += option.cost;
      }
    });
  });
  return total;
};

const tripInfoContainer = document.querySelector(`.trip-main__trip-info `);
const tripTotal = document.querySelector(`.trip-info__cost-value `);
tripTotal.textContent = getTotal(mockPoints);

const menu = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

tripInfoContainer.innerHTML = tripInfoLayout(getTripInfo(mockPoints));
menu.insertAdjacentHTML(`afterbegin`, menuLayout());
menu.insertAdjacentHTML(`beforeend`, filtersLayout(getFilter()));
tripEvents.insertAdjacentHTML(`afterbegin`, sortLayout());

const tripDays = document.createElement(`ul`);
tripDays.classList.add(`trip-days`);

[...getDays(mockPoints)].map((day, index) => tripDays.appendChild(renderTripDay(day, index)));
tripEvents.appendChild(tripDays);

const eventsContainer = document.querySelector(`.trip-events__list`);

const renderPoint = (mockPoint) => {
  const event = new Event(mockPoint);
  const eventEdit = new EventEdit(mockPoint);

  const hideOnEsc = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      eventsContainer.replaceChild(event.getElement(), eventEdit.getElement());
    }
  }; 

  event.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      eventsContainer.replaceChild(eventEdit.getElement(), event.getElement());
      document.addEventListener(`keydown`, hideOnEsc);
    });

  eventEdit.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      eventsContainer.replaceChild(event.getElement(), eventEdit.getElement());
      document.removeEventListener(`keydown`, hideOnEsc);
    });
  eventEdit.getElement()
    .querySelector(`.event__save-btn`)
    .addEventListener(`click`, () => {
      eventsContainer.replaceChild(event.getElement(), eventEdit.getElement());
      document.removeEventListener(`keydown`, hideOnEsc);
    });

  eventEdit.getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, () => {
      eventsContainer.replaceChild(event.getElement(), eventEdit.getElement());
      document.removeEventListener(`keydown`, hideOnEsc);
    });

  eventEdit.getElement()
    .querySelector(`.event__reset-btn`)
    .addEventListener(`click`, () => {
      unRender(eventEdit.getElement());
      eventEdit.removeElement();
      document.removeEventListener(`keydown`, hideOnEsc);
    });

  render(eventsContainer, event.getElement(), Position.BEFOREEND);
};

const futurePoints = mockPoints.filter((day) => day.timeStart > Date.now());
console.log(futurePoints);

if (futurePoints.length === 0) {
  tripEvents.innerHTML = `<h2 class="visually-hidden">Trip events</h2><p class="trip-events__msg">Click New Event to create your first point</p>`;
} else {
  mockPoints.map((point) => renderPoint(point));
}
