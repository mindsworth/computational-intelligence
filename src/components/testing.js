import React, { useEffect, useRef, useCallback } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);

  const drawGrids = useCallback((ctx, h, w, gBlk = 1, color = "#ececec") => {
    let xGrid = gBlk * 10;
    let yGrid = gBlk * 10;
    const cellSize = gBlk * 10;

    ctx.beginPath();
    ctx.strokeStyle = color;

    while (xGrid < h) {
      ctx.moveTo(0, xGrid);
      ctx.lineTo(w, xGrid);

      xGrid += cellSize;
    }

    while (yGrid < w) {
      ctx.moveTo(yGrid, 0);
      ctx.lineTo(yGrid, h);

      yGrid += cellSize;
    }

    ctx.stroke();
  }, []);

  const drawAxis = useCallback((ctx, h, w) => {
    const halfW = w / 2;
    const halfH = h / 2;
    let yPlot = 50;
    let xPlot = 40;
    let pop = 0;

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.moveTo(w, halfH);
    ctx.lineTo(0, halfH);
    ctx.moveTo(h, 0);
    ctx.lineTo(halfW, halfW);

    ctx.moveTo(h, 0);

    for (let i = 1; i <= 10; i++) {
      ctx.strokeText(pop, halfW + 10, blocks(yPlot));
      yPlot -= 5;
      pop += 500;
    }

    ctx.stroke();
  }, []);

  const blocks = (count) => count * 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const h = canvas.height;
    const w = canvas.width;

    console.log("CanvasHeight", canvas.height);

    drawGrids(ctx, h, w);
    drawGrids(ctx, h, w, 5, "#dbdbdb");
    drawAxis(ctx, h, w);
  }, [drawGrids]);

  return <canvas ref={canvasRef} {...props} />;
}

export default Canvas;
