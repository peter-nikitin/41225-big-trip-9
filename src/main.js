import {tripInfo as tripInfoLayout} from './components/tripInfo.js';
import {menu as menuLayout} from './components/menu.js';
import {filtersLayout} from './components/filters.js';

import {getPoint, getFilter, getTripInfo} from './data.js';

import TripController from './components/tripController';

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

tripInfoContainer.insertAdjacentHTML(`afterbegin`, tripInfoLayout(getTripInfo(mockPoints)));
menu.insertAdjacentHTML(`afterbegin`, menuLayout());
menu.insertAdjacentHTML(`beforeend`, filtersLayout(getFilter()));


const eventsContainer = document.querySelector(`.trip-events`);

const tripController = new TripController(eventsContainer, mockPoints);
tripController.init();
