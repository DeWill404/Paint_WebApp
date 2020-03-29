import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_FILL, TOOL_ERASER} from "./tool.js";
import Paint from "./paintClass.js";
import Point from "./point_model.js";
import { getMouseCoordinatesCanvas } from "./utility.js";


var paint = new Paint("canvas");
paint.activeTool = TOOL_LINE;
paint.lineWidth = 2;
paint.selectColor = "#000000";
paint.init();

// Creating Event Listener and Toggle Active listener
document.querySelectorAll("[data-commands]").forEach(
  item => {
    item.addEventListener("click", e => {

      let command = item.getAttribute("data-commands");

      if(command === 'undo')
        paint.undoPaint();
      else if (command === 'download') {
        var canvas = document.getElementById("canvas");
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement("a");
        link.download = 'my-image.png';
        link.href = image;
        link.click();
      }

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
