export const getPoint = () => ({
  icon: [`bus`, `check-in`
    `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`,
  ][Math.floor(Math.random() * 12)],
})