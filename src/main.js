import { tripInfo as tripInfoLayout } from './components/tripInfo.js';
import { menu as menuLayout } from './components/menu.js';
import { filtersLayout } from './components/filters.js';


import { sort as sortLayout } from './components/sort.js';
import { getPoint, getFilter, getDays, getTripInfo } from './data.js';
import { renderTripDay } from './renderTripDay.js';
import { render } from './render.js';


const days = getDays(1, new Array(3).fill(``).map(() => getPoint(
    Math.floor(Math.random() * 100),
    {type: `activity`, number: 2},
    Math.floor(Math.random() * 4),
    new Array(Math.floor(Math.random() * 3)).fill(``).map(() => Math.floor(Math.random() * 11)),
    new Array(Math.floor(Math.random() * 4)).fill(``).map(() => Math.floor(Math.random() * 4)))));

const getTotal = (days) => {
  let total = 0;
  days.map((day) => day.points.map((point) => {
    total += point.price;
    point.selectedOptions.map((option) => {
      total += option.cost;
    });
  }));
  return total;
};

const tripInfoContainer = document.querySelector(`.trip-main__trip-info `);
const tripTotal = document.querySelector(`.trip-info__cost-value `);
tripTotal.textContent = getTotal(days);
const menu = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripInfoContainer, tripInfoLayout(getTripInfo(days)), `afterbegin`);
render(menu, menuLayout(), `afterbegin`);
render(menu, filtersLayout(getFilter()), `beforeend`);
render(tripEvents, sortLayout(), `afterbegin`);

const tripDays = document.createElement(`ul`);
tripDays.classList.add(`trip-days`);

days.map((day, index) => tripDays.appendChild(renderTripDay(index + 1, day.points)));
tripEvents.appendChild(tripDays);