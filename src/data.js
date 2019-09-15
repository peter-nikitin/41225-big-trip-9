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

export const activity = [
  {
    name: `taxi`,
    type: `transfer`,
    options: [
      {name: `Snaks`, cost: 2},
      {name: `Waiting`, cost: 9},
    ]
  },
  {
    name: `bus`,
    type: `transfer`,
    options: [
      {name: `Add meal`, cost: 2},
      {name: `Choose seats`, cost: 9},
    ]
  },
  {
    name: `train`,
    type: `transfer`,
    options: [
      {name: `Add usb port`, cost: 10},
      {name: `Switch to first class`, cost: 150},
      {name: `Add meal`, cost: 2},
      {name: `Choose seats`, cost: 9},
    ]
  },
  {
    name: `ship`,
    type: `transfer`,
    options: [
      {name: `Choos cabin with window`, cost: 10},
      {name: `Restaurant dinner`, cost: 150},
    ]
  },
  {
    name: `transport`,
    type: `transfer`,
    options: [
      {name: `Choose Sits`, cost: 10},
      {name: `Transfer`, cost: 150},
    ]
  },
  {
    name: `drive`,
    type: `transfer`,
    options: [
      {name: `Full inshurance`, cost: 100},
      {name: `Empty tank`, cost: 20},
    ]
  },
  {
    name: `flight`,
    type: `transfer`,
    options: [
      {name: `Add luggage`, cost: 10},
      {name: `Switch to comfort class`, cost: 150},
      {name: `Add meal`, cost: 2},
      {name: `Choose seats`, cost: 9},
    ]
  },
  {
    name: `check-in`,
    type: `activity`,
    options: [
      {name: `Early checkin`, cost: 2},
      {name: `Lat checkout`, cost: 9},
    ]
  },
  {
    name: `sightseeing`,
    type: `activity`,
    options: [
      {name: `Lunch`, cost: 32},
      {name: `Dinner`, cost: 29},
      {name: `Souvinirs`, cost: 59},
    ]
  },
  {
    name: `restaurant`,
    type: `activity`,
    options: [
      {name: `Reservation`, cost: 32},
      {name: `Free bar`, cost: 129},
      {name: `Vine testing`, cost: 59},
    ]
  }
]

export const citys = [
  {
    name: `Moscow`,
    description: new Array(Math.floor(Math.random() * 3)).fill(``).map(() => descriptions[Math.floor(Math.random() * descriptions.length)]).join(` `),
    images: new Array(Math.floor(Math.random() * 7)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    name: `Sain-Petersburg`,
    description: new Array(Math.floor(Math.random() * 3)).fill(``).map(() => descriptions[Math.floor(Math.random() * descriptions.length)]).join(` `),
    images: new Array(Math.floor(Math.random() * 7)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    name: `Porto`,
    description: new Array(Math.floor(Math.random() * 3)).fill(``).map(() => descriptions[Math.floor(Math.random() * descriptions.length)]).join(` `),
    images: new Array(Math.floor(Math.random() * 7)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  },
  {
    name: `Lisboa`,
    description: new Array(Math.floor(Math.random() * 3)).fill(``).map(() => descriptions[Math.floor(Math.random() * descriptions.length)]).join(` `),
    images: new Array(Math.floor(Math.random() * 7)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
  }
];

export const getPoint = (price, activityNumber) => ({
  action: activity[activityNumber].name,
  city: citys[Math.floor(Math.random() * citys.length)].name,
  description: citys[Math.floor(Math.random() * citys.length)].description,
  images: new Array(Math.floor(Math.random() * 7)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  timeStart: new Date(Date.now() + Math.floor(Math.random() * 10)),
  timeEnd: new Date(Date.now() + (Math.floor(Math.random() * 10) + 1) * 1000 * 60 * 60),
  price,
  selectedOptions: new Set(
      new Array(Math.floor(Math.random() * 2))
        .fill(``)
        .map(
            () => Math.floor(Math.random() * activity[activityNumber].options.length))
            .map((option) => activity[activityNumber].options[option])),
  isFavorite: Boolean(Math.round(Math.random()))
});

export const getFilter = () => [`Everything`, `Future`, `Past`];

export const getTripInfo = (points) => ({
  citys: new Set(points.map((point) => point.city)),
  startDate: points[0].timeStart,
  endDate: points[points.length - 1].timeEnd,
});
