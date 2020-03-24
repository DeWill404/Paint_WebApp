import Point from "./point_model.js"

export function getMouseCoordinatesCanvas (e, canvas) {
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  return new Point(x, y);
}