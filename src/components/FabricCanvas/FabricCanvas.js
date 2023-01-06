import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";

const FabricCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 500,
      backgroundColor: "gray",
      zoom: 0.5,
    });

  const freeDrawHandler = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
  };

  const drawColorHandler = (color) => {
    canvas.freeDrawingBrush.color = color;
  };
  const drawWidthHandler = (width) => {
    canvas.freeDrawingBrush.width = width;
  };
  const clearButtonHandler = () => {
    canvas.clear();
  };
  return (
    <>
      <StMenu>
        <button onClick={freeDrawHandler}>freedraw</button>
        <input
          type="color"
          onChange={(e) => {
            drawColorHandler(e.target.value);
          }}
        />
        <input
          type="range"
          defaultValue="1"
          min="1"
          max="10"
          onChange={(e) => {
            drawWidthHandler(e.target.value);
          }}
        />
        <button onClick={clearButtonHandler}>clear</button>
      </StMenu>
      <StDiv>
        <canvas ref={canvasRef} />;
      </StDiv>
    </>
  );
};

export default FabricCanvas;

const StDiv = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  position: absolute;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StMenu = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 2px solid black;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
