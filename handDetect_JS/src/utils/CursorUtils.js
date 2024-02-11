const hoverElement = (elem) => {
  elem.className = "interactable-hovering";
};

const unHoverElement = (elem) => {};

const clickElement = (elem) => {
  elem.click();
};

export { hoverElement, unHoverElement, clickElement };
