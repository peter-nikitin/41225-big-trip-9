import AbstractComponent from './abstractComponent';

export default class TripDays extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
