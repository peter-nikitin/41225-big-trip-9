export const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const options = [
  {name: `Add luggage`, cost: 10},
  {name: `Switch to comfort class`, cost: 150},
  {name: `Add meal`, cost: 2},
  {name: `Choose seats`, cost: 9},
];

export const activity = {
  transfer: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  activity: [`Check-in`, `Sightseeing`, `Restaurant`]
};
export const citys = [`Moscow`, `Sain-Petersburg`, `Porto`, `Lisboa`];

export const getPoint = (price, {type, number}) => ({
  action: {
    type,
    name: activity[type][number]
  },
  city: citys[Math.floor(Math.random() * citys.length)],
  images: new Array(Math.floor(Math.random() * 7)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  description: new Array(Math.floor(Math.random() * 3)).fill(``).map((item, index) => descriptions[index]).join(` `),
  timeStart: Date.now() + Math.floor(Math.random() * 10),
  timeEnd: Date.now() + Math.floor(Math.random() * 10 * 2),
  price,
  selectedOptions: new Array(Math.floor(Math.random() * 3)).fill(``).map(() => Math.floor(Math.random() * options.length)).map((option) => options[option]),
  isFavorite: Boolean(Math.round(Math.random()))
});

export const getFilter = () => [`Everything`, `Future`, `Past`];

export const getTripInfo = (points) => ({
  citys: new Set(points.map((point) => point.city)),
  startDate: points[0].timeStart,
  endDate: points[points.length - 1].timeEnd,
});
