// ____________________________
const setDroppable = (items) => {
  items.forEach((item, i) => {
    if (!item.innerText) {
      state.emptyCellIndex = i;
      item.setAttribute("ondrop", "drop_handler(event);");
      item.setAttribute("ondragover", "dragover_handler(event);");
      item.setAttribute("class", "empty");
      item.setAttribute("draggable", "false");
      item.setAttribute("ondragstart", "");
      item.setAttribute("ondragend", "");
    }
    return;
  });
};

const removeDroppable = (items) => {
  items.forEach((item) => {
    item.setAttribute("ondrop", "");
    item.setAttribute("ondragover", "");
    item.setAttribute("draggable", "false");
    item.setAttribute("ondragstart", "");
    item.setAttribute("ondragend", "");
  });
};

const setDraggable = (items) => {
  const [row, col] = getEmptyCell();

  let left,
    right,
    top,
    bottom = null;
  if (state.dimension[row][col - 1]) left = state.dimension[row][col - 1];
  if (state.dimension[row][col + 1]) right = state.dimension[row][col + 1];
  if (state.dimension[row - 1] != undefined)
    top = state.dimension[row - 1][col];
  if (state.dimension[row + 1] != undefined)
    bottom = state.dimension[row + 1][col];

  // Setting Left - Right tiles draggable
  items.forEach((item) => {
    if (
      item.innerText == top ||
      item.innerText == bottom ||
      item.innerText == right ||
      item.innerText == left
    ) {
      item.setAttribute("draggable", "true");
      item.setAttribute("ondragstart", "dragstart_handler(event)");
      item.setAttribute("ondragend", "dragend_handler(event)");
    }
  });
};
