import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_FILL, TOOL_ERASER} from "./tool.js";
import Paint from "./paintClass.js";
import Point from "./point_model.js";
import { getMouseCoordinatesCanvas } from "./utility.js";


var paint = new Paint("canvas");
paint.activeTool = TOOL_LINE;
paint.lineWidth = 2;
paint.selectColor = "#000";
paint.init();

// Creating Event Listener and Toggle Active listener
document.querySelectorAll("[data-commands]").forEach(
  item => {
    item.addEventListener("click", e => {

      console.log(item.getAttribute("data-commands"));

    });
  }
);
document.querySelectorAll("[data-tools]").forEach(
  item => {
    item.addEventListener("click", e => {

      document.querySelector("[data-tools].active").classList.toggle("active");
      item.classList.toggle("active");

      let selectedTool = item.getAttribute("data-tools");
      paint.activeTool = selectedTool;

    });
  }
);
document.querySelectorAll("[data-shapes]").forEach(
  item => {
    item.addEventListener("click", e => {

      document.querySelector("[data-shapes].active").classList.toggle("active");
      item.classList.toggle("active");

    });
  }
);
document.querySelectorAll("[data-linewidth]").forEach(
  item => {
    item.addEventListener("click", e => {

      document.querySelector("[data-linewidth].active").classList.toggle("active");
      item.classList.toggle("active");

      let linewidth = item.getAttribute("data-linewidth");
      paint.lineWidth = linewidth;

    });
  }
);
document.querySelectorAll("[data-swatch]").forEach(
  item => {
    item.addEventListener("click", e => {

      document.querySelector("[data-swatch].active").classList.toggle("active");
      item.classList.toggle("active");

      let color = item.getAttribute("data-swatch");
      paint.selectColor = color;

    });
  }
);
