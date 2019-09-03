export const tripInfo = ({citys, startDate, endDate}) => `
<div class="trip-info__main">
  <h1 class="trip-info__title">
  ${Array.from(citys).map((city, index) => `
  ${(index !== 0 && city !== ``) ? ` &mdash; ` : ``}
  ${city}
  ${ (index !== citys.length - 1 && city !== ``) ? `` : ` &mdash; `}
  `).join(``)}

  <p class="trip-info__dates">${ new Date(startDate).toDateString()}&nbsp;&mdash;&nbsp;${ new Date(endDate).toDateString()}</p>
</div>
`;
