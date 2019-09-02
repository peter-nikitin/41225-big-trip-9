// import {render} from './render.js';
import {eventEdit as eventEditLayout} from './components/eventEdit.js';
import {eventItem as eventItemLayout} from './components/eventItem.js';


export const renderTripDay = (day, dayIndex) => {

  const tripDyaItem = document.createElement(`li`);
  tripDyaItem.classList.add(`trip-days__item`);
  tripDyaItem.classList.add(`day`);

  const dayInfo = document.createElement(`div`);
  dayInfo.classList.add(`day__info`);

  const counter = document.createElement(`span`);
  counter.classList.add(`day__counter`);
  counter.innerText = dayIndex + 1;

  const dateElement = document.createElement(`time`);
  dateElement.classList.add(`day__date`);
  dateElement.dateTime = day;
  dateElement.innerText = day;

  dayInfo.appendChild(counter);
  dayInfo.appendChild(dateElement);

  const tripEventsList = document.createElement(`ul`);
  tripEventsList.classList.add(`trip-events__list`);

  tripDyaItem.appendChild(dayInfo);
  tripDyaItem.appendChild(tripEventsList);

  return tripDyaItem;
};
