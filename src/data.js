export const getPoint = (timeStart, timeEnd, price) => ({
  icon: [
    `bus`,
    `check-in`,
    `check-in`,
    `drive`,
    `flight`,
    `restaurant`,
    `ship`,
    `sightseeing`,
    `taxi`,
    `train`,
    `transport`,
    `trip`
  ][Math.floor(Math.random() * 12)],
  action: [`Taxi to`, `Flight to`, `Drive to`, `Check into`, `Natural History Museum`, ``][
    Math.floor(Math.random() * 6)
  ],
  city: [`Moscow`, `Sain-Petersburg`, `Porto`, `Lisboa`][
    Math.floor(Math.random() * 4)
  ],
  image: `http://picsum.photos/300/150?r=${Math.random()}`,
  description: [
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
  ],
  timeStart: Date.now() + Math.floor(Math.random() * 10),
  timeEnd: Date.now() + Math.floor(Math.random() * 10 * 2),
  price,
  options: [
    {name: `Add luggage`, cost: 10},
    {name: `Switch to comfort class`, cost: 150},
    {name: `Add meal`, cost: 2},
    {name: `Choose seats`, cost: 9},
  ]
});
