import { tripInfo as tripInfoLayout } from './components/tripInfo.js';
import { menu as menuLayout } from './components/menu.js';
import { filters as filtersLayout } from './components/filters.js';


import { sort as sortLayout } from './components/sort.js';
import { getPoint, getFilter, getDays } from './data.js';
import { renderTripDay } from './renderTripDay.js'
import { render } from './render.js'



const tripInfo = document.querySelector(`.trip-main__trip-info `);
const menu = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripInfo, tripInfoLayout(), `afterbegin`);
render(menu, menuLayout(), `afterbegin`);
render(menu, filtersLayout(getFilter()), `beforeend`);
render(tripEvents, sortLayout(), `afterbegin`);

const days = getDays(3, new Array(3).fill(``).map(() => getPoint(Math.floor(Math.random() * 100))))
const tripPonts = new Array(3).fill(``).map(() => getPoint(Math.floor(Math.random() * 100)));

console.log(days);


const tripDays = document.createElement(`ul`);
tripDays.classList.add(`trip-days`);

days.map((day, index) => tripDays.appendChild(renderTripDay(index + 1, day.points)));
tripEvents.appendChild(tripDays);