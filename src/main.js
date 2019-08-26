import {tripInfo as tripInfoLayout} from './components/tripInfo.js';
import {menu as menuLayout} from './components/menu.js';
import {filters as filtersLayout} from './components/filters.js';
import {eventEdit as eventEditLayout} from './components/eventEdit.js';
import {eventItem as eventItemLayout} from './components/eventItem.js';
import {sort as sortLayout} from './components/sort.js';
import {getPoint} from './data.js';

const render = (container, element, position) => {
  container.insertAdjacentHTML(position, element);
};

const tripInfo = document.querySelector(`.trip-main__trip-info `);
const menu = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripInfo, tripInfoLayout(), `afterbegin`);
render(menu, menuLayout(), `afterbegin`);
render(menu, filtersLayout(), `beforeend`);
render(tripEvents, sortLayout(), `afterbegin`);

const tripDays = document.createElement(`ul`);
tripDays.classList.add(`trip-days`);

const renderTripDay = (dayNumber, eventsCount) => {
  const tripDyaItem = document.createElement(`li`);
  tripDyaItem.classList.add(`trip-days__item`);
  tripDyaItem.classList.add(`day`);

  const dayInfo = document.createElement(`div`);
  dayInfo.classList.add(`day__info`);

  const counter = document.createElement(`span`);
  counter.classList.add(`day__counter`);
  counter.innerText = dayNumber;

  const dateElement = document.createElement(`time`);
  dateElement.classList.add(`day__date`);
  dateElement.dateTime = `2019-03-18`;
  dateElement.innerText = `MAR 18`;

  dayInfo.appendChild(counter);
  dayInfo.appendChild(dateElement);

  const tripEventsList = document.createElement(`ul`);
  tripEventsList.classList.add(`trip-events__list`);

  const tripEventsItemEdit = document.createElement(`li`);
  tripEventsItemEdit.classList.add(`trip-events__item`);
  render(tripEventsItemEdit, eventEditLayout(), `afterbegin`);
  tripEventsList.appendChild(tripEventsItemEdit);

  for (let index = 0; index < eventsCount; index++) {
    const tripEventsItem = document.createElement(`li`);
    tripEventsItem.classList.add(`trip-events__item`);
    render(tripEventsItem, eventItemLayout(getPoint()), `afterbegin`);
    tripEventsList.appendChild(tripEventsItem);
  }

  tripDyaItem.appendChild(dayInfo);
  tripDyaItem.appendChild(tripEventsList);

  return tripDyaItem;
};

tripDays.appendChild(renderTripDay(1, 3));
tripEvents.appendChild(tripDays);
