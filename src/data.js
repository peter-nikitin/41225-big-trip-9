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

export const activity = [
  {
    name: `Taxi`,
    type: `transfer`
  },
  {
    name: `Bus`,
    type: `transfer`
  },
  {
    name: `Train`,
    type: `transfer`
  },
  {
    name: `Ship`,
    type: `transfer`
  },
  {
    name: `Transport`,
    type: `transfer`
  },
  {
    name: `Drive`,
    type: `transfer`
  },
  {
    name: `Flight`,
    type: `transfer`
  },
  {
    name: `Check-in`,
    type: `activity`
  },
  {
    name: `Sightseeing`,
    type: `activity`
  },
  {
    name: `Restaurant`,
    type: `activity`
  }
]

export const citys = [`Moscow`, `Sain-Petersburg`, `Porto`, `Lisboa`];

export const getPoint = (price) => ({
  action: activity[Math.floor(Math.random() * activity.length)].name,
  city: citys[Math.floor(Math.random() * citys.length)],
  images: new Array(Math.floor(Math.random() * 7)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  description: new Array(Math.floor(Math.random() * 3)).fill(``).map((item, index) => descriptions[index]).join(` `),
  timeStart: new Date(Date.now() + Math.floor(Math.random() * 10)),
  timeEnd: new Date(Date.now() + (Math.floor(Math.random() * 10) + 1) * 1000 * 60 * 60),
  price,
  selectedOptions: new Set(new Array(Math.floor(Math.random() * 3)).fill(``).map(() => Math.floor(Math.random() * options.length)).map((option) => options[option])),
  isFavorite: Boolean(Math.round(Math.random()))
});

export const getFilter = () => [`Everything`, `Future`, `Past`];

export const getTripInfo = (points) => ({
  citys: new Set(points.map((point) => point.city)),
  startDate: points[0].timeStart,
  endDate: points[points.length - 1].timeEnd,
});
