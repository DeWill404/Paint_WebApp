import Point from "./point_model.js";

export default class Fill {
  constructor (canvas, point, color) {
    this.context = canvas.getContext("2d");
    

    this.ImageData = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);

    const targetColor = this.getPixel(point);
    const fillColor = this.hexToRgb (color);

    this.fillStack = [];

    this.floodFill(point, targetColor, fillColor);
    this.fillColor();   

  }

  floodFill (point, targetColor, fillColor) {
    if (this.colorMatch(targetColor, fillColor))
      return;
    
    const currentcolor = this.getPixel(point);

    if(this.colorMatch(currentcolor, targetColor)) {
      this.setPixel(point, fillColor);

      this.fillStack.push([new Point(point.x+1, point.y), targetColor, fillColor]);
      this.fillStack.push([new Point(point.x-1, point.y), targetColor, fillColor]);
      this.fillStack.push([new Point(point.x, point.y+1), targetColor, fillColor]);
      this.fillStack.push([new Point(point.x, point.y-1), targetColor, fillColor]);
    }

  }

  fillColor() {
    if(this.fillStack.length) {
      let range = this.fillStack.length;
      for(let i=0; i<range; i++) {
        this.floodFill(this.fillStack[i][0], this.fillStack[i][1], this.fillStack[i][2]);
      } 
      this.fillStack.splice(0, range);
      this.fillColor();   
    } else {
      this.context.putImageData(this.ImageData, 0, 0);
      this.fillStack = [];
    }
  }

  setPixel(point, fillColor) {
    const offset = (point.y * this.ImageData.width + point.x) * 4; 

    this.ImageData.data[offset + 0] = fillColor[0];
    this.ImageData.data[offset + 1] = fillColor[1];
    this.ImageData.data[offset + 2] = fillColor[2];
    this.ImageData.data[offset + 3] = fillColor[3];
  }

  colorMatch(colorA, colorB) {
    return (colorA[0] === colorB[0]) && (colorA[1] === colorB[1]) && (colorA[2] === colorB[2]) && (colorA[3] === colorB[3]);
  }

  getPixel (point) {  
    if (point.x < 0 || point.y < 0 || point.x >= this.ImageData.width || point.y >= this.ImageData.height) {
      return [-1, -1, -1, -1];
    }
    else {
      const offset = (point.y * this.ImageData.width + point.x) * 4;
      return [
        this.ImageData.data[offset + 0],
        this.ImageData.data[offset + 1],
        this.ImageData.data[offset + 2],
        this.ImageData.data[offset + 3]
      ];
    }
  }

  hexToRgb (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      255 
    ];
  }
}
