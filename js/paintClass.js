import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_FILL, TOOL_ERASER} from "./tool.js";
import { getMouseCoordinatesCanvas, findDistance } from "./utility.js";
import Fill from "./fill-class.js";

export default class Paint {

  constructor (canvasId) {
    
    this.canvas = document.getElementById(canvasId);
    this.context = canvas.getContext("2d");
    this.undoStack = [];
    this.undoLimit = 3;

  }

  set activeTool(tool) {
    this.tool = tool;
  }

  set lineWidth(linewidth) {
    this._lineWidth = linewidth;
    this.context.lineWidth = this._lineWidth;
  }

  set selectColor(color) {
    this.color = color;
    this.context.strokeStyle = this.color;
  }

  init() {
    this.canvas.onmousedown = e => this.onMouseDown(e);
  }

  onMouseDown(e) {

    this.saveData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    if (this.undoStack.length >= this.undoLimit)
      this.undoStack.shift();
    this.undoStack.push(this.saveData);

    this.canvas.onmousemove = e => this.onMouseMove(e);
    document.onmouseup = e => this.onMouseUp(e);

    this.startPos = getMouseCoordinatesCanvas(e, this.canvas);

    if (this.tool == TOOL_PENCIL || this.tool == TOOL_BRUSH) {
      this.context.beginPath();
      this.context.moveTo(this.startPos.x, this.startPos.y);
    } else if (this.tool == TOOL_FILL) {
      new Fill(this.canvas, this.startPos, this.color);
    } else if (this.tool == TOOL_ERASER) {
      this.context.clearRect(this.startPos.x, this.startPos.y, this._lineWidth + 4, this._lineWidth + 4);
    }
  }

  onMouseMove(e) {

    this.currentPos = getMouseCoordinatesCanvas(e, this.canvas);

    switch (this.tool) {
      case  TOOL_LINE:
      case TOOL_RECTANGLE:
      case TOOL_CIRCLE:
      case TOOL_TRIANGLE:
        this.drawShape();
        break;
      case TOOL_PENCIL:
      case TOOL_BRUSH:
        this.drawFreeLine(this._lineWidth);
        break;
      case TOOL_ERASER:
        this.context.clearRect(this.currentPos.x, this.currentPos.y, this._lineWidth + 4, this._lineWidth + 4);
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

    if (this.tool == TOOL_LINE) {
      this.context.moveTo(this.startPos.x, this.startPos.y);
      this.context.lineTo(this.currentPos.x, this.currentPos.y);
    } else if(this.tool == TOOL_RECTANGLE) {
      this.context.rect(this.startPos.x, this.startPos.y, (this.currentPos.x-this.startPos.x), (this.currentPos.y - this.startPos.y));
    } else if (this.tool == TOOL_CIRCLE) {
      let distance = findDistance(this.startPos, this.currentPos);
      this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2*Math.PI);
    } else if (this.tool == TOOL_TRIANGLE) {
      this.context.moveTo((this.startPos.x+this.currentPos.x)/2, this.startPos.y);
      this.context.lineTo(this.currentPos.x, this.currentPos.y);
      this.context.moveTo((this.startPos.x+this.currentPos.x)/2, this.startPos.y);
      this.context.lineTo(this.startPos.x, this.currentPos.y);
      this.context.moveTo(this.startPos.x, this.currentPos.y);
      this.context.lineTo(this.currentPos.x, this.currentPos.y);
    }

    this.context.stroke();
  }

  drawFreeLine (lineWidth) {
    if (this.tool == TOOL_BRUSH)
      lineWidth += 1;
    this.context.lineWidth = lineWidth;
    this.context.lineTo(this.currentPos.x, this.currentPos.y);
    this.context.stroke();
  }

  undoPaint() {
    if (this.undoStack.length > 0) {
      this.context.putImageData(this.undoStack[this.undoStack.length -1], 0, 0);
      this.undoStack.pop();
    }
    else {
      alert("No Undo Available");
    }
  }
}
