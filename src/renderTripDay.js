import { render } from './render.js'
import { eventEdit as eventEditLayout } from './components/eventEdit.js';
import { eventItem as eventItemLayout } from './components/eventItem.js';
export const renderTripDay = (dayNumber, tripPonts) => {
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



  tripPonts.map((point) => {
    const tripEventsItem = document.createElement(`li`);
    tripEventsItem.classList.add(`trip-events__item`);
    render(tripEventsItem, eventItemLayout(point, [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)]), `afterbegin`);
    tripEventsList.appendChild(tripEventsItem);
  })


  tripDyaItem.appendChild(dayInfo);
  tripDyaItem.appendChild(tripEventsList);

  return tripDyaItem;
};