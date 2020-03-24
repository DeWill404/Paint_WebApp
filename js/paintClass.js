import { SHAPE_LINE, SHAPE_RECTANGLE, SHAPE_CIRCLE, SHAPE_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_FILL, TOOL_ERASER} from "./tool.js";
import { getMouseCoordinatesCanvas } from "./utility.js";
import Point from "./point_model.js";

export default class Paint {

  constructor (canvasId) {
    
    this.canvas = document.getElementById(canvasId);
    this.context = canvas.getContext("2d");

  }

  set activeTool(tool) {
    this.tool = tool;
    console.log(this.tool)
  }

  init() {
    this.canvas.onmousedown = e => this.onMouseDown(e);
  }

  onMouseDown(e) {

    this.canvas.onmousemove = e => this.onMouseMove(e);
    document.onmouseup = e => this.onMouseUp(e);

    this.startPos = getMouseCoordinatesCanvas(e, this.canvas);
    console.log(this.startPos);


  }

  onMouseMove(e) {

    this.startPos = getMouseCoordinatesCanvas(e, this.canvas);
    console.log(this.startPos);
    // console.log(e.clientX, e.clientY);
  }

  onMouseUp(e) {
    this.canvas.onmousemove = null;
    document.onmouseup = null;
  }
}