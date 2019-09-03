export const eventItem = ({action, city, timeStart, timeEnd, price, selectedOptions}) => `
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${action.name.toLowerCase()}.png" alt="${action.name.toLowerCase()}">
      </div>
      <h3 class="event__title">${action.name} ${ action.type === `transfer` ? `to ` : `at `} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${new Date(timeStart).toLocaleTimeString()}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${new Date(timeEnd).toLocaleTimeString()}</time>
        </p>
        <p class="event__duration">${new Date(timeStart - timeEnd).toLocaleTimeString()}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
    
        ${selectedOptions.map((option) => `
          <li class="event__offer">
          <span class="event__offer-title">${option.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.cost}</span>
          </li>
        `).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
`;
