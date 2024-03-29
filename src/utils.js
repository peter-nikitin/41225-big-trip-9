export const createElement = (element) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = element;
  return newElement.firstElementChild;
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, position) => {
  switch (position) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unRender = (element) => {
  element.remove();
};

export const getDays = (points) => new Set(points.map((point) => `${new Date(point.timeStart).getFullYear()}-${new Date(point.timeStart).getMonth()}-${new Date(point.timeStart).getDate()}`));
