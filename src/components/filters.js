export const filtersLayout = (filters) => `
<form class="trip-filters" action="#" method="get">
${filters.map((filter) => `
<div class="trip-filters__filter">
  <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}">
  <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
</div>

`).join(``)}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;
