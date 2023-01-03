import { useState, useEffect } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const handleMouseDown = (event) => {};
  const handleMouseMove = (evnet) => {};
  const handleMouseUp = (event) => {};

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const roughCanvas = rough.canvas(canvas);
    const rect = generator.rectangle(100, 100, 100, 100);
    const line = generator.line(100, 100, 200, 200);
    roughCanvas.draw(rect);
    roughCanvas.draw(line);
  });

  return (
    <canvas
      id="canvas"
      styled={{ backgroundColor: "blue" }}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Canvas;
