import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current);
    fabricRef.current.selectable = true;
  }, []);

  const rect = () => {
    const rect = new fabric.Rect({
      top: 50,
      left: 50,
      width: 50,
      height: 50,
      fill: "red",
      selectable: "true",
    });
    fabricRef.current.add(rect);
  };

  const draw = () => {
    fabricRef.current.isDrawingMode = !fabricRef.current.isDrawingMode;
  };

  const setDrawColor = (color) => {
    fabricRef.current.freeDrawingBrush.color = color;
  };

  const setDrawWidth = (width) => {
    fabricRef.current.freeDrawingBrush.width = width;
  };

  const circle = () => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: "green",
      selectable: "true",
    });
    fabricRef.current.add(circle);
  };

  return (
    <>
      <div
        style={{
          width: "100px",
          height: "700px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {/* <button onClick={move}>move</button> */}
        <div>
          <button onClick={draw}>draw</button>
          <input
            type="color"
            onChange={(e) => {
              setDrawColor(e.target.value);
            }}
          />
          <input
            type="range"
            min="1"
            max="10"
            defaultValue="1"
            onChange={(e) => {
              setDrawWidth(e.target.value);
            }}
          />
        </div>
        <button onClick={rect}>rect</button>
        <button onClick={circle}>circle</button>
      </div>
      <StDiv>
        <canvas ref={canvasRef} width={400} height={400} />;
      </StDiv>
    </>
  );
};

export default FabricCanvas;

const StDiv = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  position: absolute;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
