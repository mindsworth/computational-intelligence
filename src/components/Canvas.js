import React, { useEffect, useRef } from "react";
// import Math from 'mathjs'
import { simplify, parse, evaluate } from "mathjs";
import { evaluateExpression, transformExpression } from "../utils";

function Canvas({ expression, ...rest }) {
  //   console.log("expression :", expression);
  const canvasRef = useRef(null);

  useEffect(() => {
    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext("2d");
    // const h = canvas.height;
    // const w = canvas.width;

    function Graph(config) {
      // user defined properties
      this.canvas = canvasRef.current;
      this.minX = config.minX;
      this.minY = config.minY;
      this.maxX = config.maxX;
      this.maxY = config.maxY;
      this.unitsPerTick = config.unitsPerTick;

      // constants
      this.axisColor = "#000000";
      this.cellColor = "#ececec";
      this.gCellColor = "#dbdbdb";
      this.font = "12pt Calibri";
      this.tickSize = 10;

      // relationships
      this.context = this.canvas.getContext("2d");
      this.rangeX = this.maxX - this.minX;
      this.rangeY = this.maxY - this.minY;
      this.unitX = this.canvas.width / this.rangeX;
      this.unitY = this.canvas.height / this.rangeY;
      this.centerY = Math.round(
        Math.abs(this.minY / this.rangeY) * this.canvas.height
      );
      this.centerX = Math.round(
        Math.abs(this.minX / this.rangeX) * this.canvas.width
      );
      this.iteration = (this.maxX - this.minX) / 1000;
      this.scaleX = this.canvas.width / this.rangeX;
      this.scaleY = this.canvas.height / this.rangeY;

      // draw x and y axis
      this.drawXAxis();
      this.drawYAxis();
      this.drawGrid(this.cellColor);
      this.drawGrid(this.gCellColor, 5);
    }

    Graph.prototype.drawXAxis = function () {
      var context = this.context;
      context.save();
      context.beginPath();
      context.moveTo(0, this.centerY);
      context.lineTo(this.canvas.width, this.centerY);
      context.strokeStyle = this.axisColor;
      context.lineWidth = 2;
      context.stroke();

      // draw tick marks
      var xPosIncrement = this.unitsPerTick * this.unitX;
      var xPos, unit;
      context.font = this.font;
      context.textAlign = "center";
      context.textBaseline = "top";

      // draw left tick marks
      xPos = this.centerX - xPosIncrement;
      unit = -1 * this.unitsPerTick;
      while (xPos > 0) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit -= this.unitsPerTick;
        xPos = Math.round(xPos - xPosIncrement);
      }

      // draw right tick marks
      xPos = this.centerX + xPosIncrement;
      unit = this.unitsPerTick;
      while (xPos < this.canvas.width) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit += this.unitsPerTick;
        xPos = Math.round(xPos + xPosIncrement);
      }
      context.restore();
    };

    Graph.prototype.drawGrid = function (color, gBlk = 1) {
      let context = this.context;
      let xGrid = gBlk * 10;
      let yGrid = gBlk * 10;
      const cellSize = gBlk * 10;
      const h = this.canvas.height;
      const w = this.canvas.width;

      context.beginPath();
      context.strokeStyle = color;

      while (xGrid < h) {
        context.moveTo(0, xGrid);
        context.lineTo(w, xGrid);

        xGrid += cellSize;
      }

      while (yGrid < w) {
        context.moveTo(yGrid, 0);
        context.lineTo(yGrid, h);

        yGrid += cellSize;
      }

      context.stroke();
    };

    Graph.prototype.drawYAxis = function () {
      var context = this.context;
      context.save();
      context.beginPath();
      context.moveTo(this.centerX, 0);
      context.lineTo(this.centerX, this.canvas.height);
      context.strokeStyle = this.axisColor;
      context.lineWidth = 2;
      context.stroke();

      // draw tick marks
      var yPosIncrement = this.unitsPerTick * this.unitY;
      var yPos, unit;
      context.font = this.font;
      context.textAlign = "right";
      context.textBaseline = "middle";

      // draw top tick marks
      yPos = this.centerY - yPosIncrement;
      unit = this.unitsPerTick;
      while (yPos > 0) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit += this.unitsPerTick;
        yPos = Math.round(yPos - yPosIncrement);
      }

      // draw bottom tick marks
      yPos = this.centerY + yPosIncrement;
      unit = -1 * this.unitsPerTick;
      while (yPos < this.canvas.height) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit -= this.unitsPerTick;
        yPos = Math.round(yPos + yPosIncrement);
      }
      context.restore();
    };

    Graph.prototype.drawEquation = function (equation, color, thickness) {
      var context = this.context;
      context.save();
      context.save();
      this.transformContext();

      context.beginPath();
      context.moveTo(this.minX, equation(this.minX));
      //   console.log("equation(this.minX) :", this.minX, equation(this.minX));

      for (
        var x = this.minX + this.iteration;
        x <= this.maxX;
        x += this.iteration
      ) {
        // console.log("equation(x) :", x, equation(x));
        context.lineTo(x, equation(x));
      }

      context.restore();
      context.lineJoin = "round";
      context.lineWidth = thickness;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    };

    Graph.prototype.transformContext = function () {
      var context = this.context;

      // move context to center of canvas
      this.context.translate(this.centerX, this.centerY);

      /*
       * stretch grid to fit the canvas window, and
       * invert the y scale so that that increments
       * as you move upwards
       */
      context.scale(this.scaleX, -this.scaleY);
    };

    const myGraph = new Graph({
      canvasId: "myCanvas",
      minX: -10,
      minY: -10,
      maxX: 10,
      maxY: 10,
      unitsPerTick: 1,
    });

    myGraph.drawEquation(
      function (x) {
        try {
          const f = parse(expression);
          const simplified = simplify(f);
          console.log("x :", x, simplified.toString());
          const result = simplified.evaluate({ x });
          console.log("result :<<<<<=====>>>>>", result);
          return result;
        } catch (error) {
          console.log("error :", error);
        }
      },
      "green",
      3
    );

    // myGraph.drawEquation(
    //   function (x) {
    //     return x * x;
    //   },
    //   "blue",
    //   3
    // );

    // myGraph.drawEquation(
    //   function (x) {
    //     return 1 * x;
    //   },
    //   "red",
    //   3
    // );
  }, [expression]);

  return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;
