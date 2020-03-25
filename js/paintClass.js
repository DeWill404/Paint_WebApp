import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_FILL, TOOL_ERASER} from "./tool.js";
import { getMouseCoordinatesCanvas } from "./utility.js";

export default class Paint {

  constructor (canvasId) {
    
    this.canvas = document.getElementById(canvasId);
    this.context = canvas.getContext("2d");

  }

  set activeTool(tool) {
    this.tool = tool;
  }

  init() {
    this.canvas.onmousedown = e => this.onMouseDown(e);
  }

  onMouseDown(e) {

    this.saveData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);


    this.canvas.onmousemove = e => this.onMouseMove(e);
    document.onmouseup = e => this.onMouseUp(e);

    this.startPos = getMouseCoordinatesCanvas(e, this.canvas);
    console.log(this.startPos);

  }

  onMouseMove(e) {

    this.currentPos = getMouseCoordinatesCanvas(e, this.canvas);
    console.log(this.currentPos);

    switch (this.tool) {
      case  TOOL_LINE:
        this.drawShape();
        break;
      default:
        break;
    }

  }

  onMouseUp(e) {
    this.canvas.onmousemove = null;
    document.onmouseup = null;
  }

  drawShape() {

    this.context.putImageData(this.saveData, 0, 0);

    this.context.beginPath();
    this.context.moveTo(this.startPos.x, this.startPos.y);
    this.context.lineTo(this.currentPos.x, this.currentPos.y);
    this.context.stroke();
  }
}