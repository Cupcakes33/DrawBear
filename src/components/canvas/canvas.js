import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import CanvasMenu from "./CanvasMenu";

const Canvas = () => {
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);

  const handleMouseDown = (event) => {
    setDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    contextRef.current.lineTo(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
    contextRef.current.stroke();
  };

  const handleMouseLeave = () => {
    setDrawing(false);
    contextRef.current.closePath();
  };

  const handleMouseUp = () => {
    setDrawing(false);
    contextRef.current.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.globalAlpha = lineOpacity;
    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [lineColor, lineWidth, lineOpacity]);

  return (
    <Box>
      <CanvasMenu
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
        setLineOpacity={setLineOpacity}
      />
      <StCanvas
        ref={canvasRef}
        width={`1280px`}
        height={`720px`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      ></StCanvas>
    </Box>
  );
};

export default Canvas;

const Box = styled.div`
  width: 1280px;
  height: 720px;
  border: 1px solid black;
  position: relative;
`;
const StCanvas = styled.canvas``;
