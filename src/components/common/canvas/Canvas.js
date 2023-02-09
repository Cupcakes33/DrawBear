import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import { TbBrush } from "react-icons/tb";
import { BiSquare, BiCircle, BiText } from "react-icons/bi";
import { GrSelect } from "react-icons/gr";
import { RiImageAddFill, RiDeleteBinLine } from "react-icons/ri";
import { flex } from "../../../UI/common";

const Canvas = ({ canvas, setCanvas, canvasBg }) => {
  const [isDrawing, setIsDrawing] = useState(true);
  const [color, setColor] = useState("black");
  const canvasRef = useRef(null);
  const ImgInput = useRef();

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas(canvasRef.current, {
      height: 350,
      width: 350,
      isDrawingMode: true,
      backgroundColor: "white",
    });

  const canvasBackground = (url) => {
    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url + "?v=" + new Date().getTime();

    image.onload = () => {
      canvas.setBackgroundImage(
        new fabric.Image(image, {
          width: canvas.width,
          height: canvas.height,
          originX: "left",
          originY: "top",
        }),
        canvas.renderAll.bind(canvas)
      );
    };
  };

  const deleteSelectedObjects = () => {
    let selection = canvas.getActiveObject();
    if (selection?._objects) {
      selection.forEachObject((obj) => {
        canvas.remove(obj);
      });
    } else {
      canvas.remove(selection);
    }
  };

  useEffect(() => {
    if (!canvas) return;
    canvas.freeDrawingBrush.width = 5;
    if (!canvasBg) return;
    canvasBackground(canvasBg);
  }, [canvas]);

  const freeDrawHandler = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setIsDrawing(!isDrawing);
    canvas.freeDrawingBrush.inverted = false;
  };

  const drawColorHandler = (color) => {
    canvas.freeDrawingBrush.color = color;
  };

  const drawWidthHandler = (width) => {
    canvas.freeDrawingBrush.width = parseInt(width, 10);
  };

  const clearButtonHandler = () => {
    deleteSelectedObjects();
  };

  const imgUpload = (e) => {
    const { files } = e.target;
    const urlFile = URL.createObjectURL(files[0]);
    new fabric.Image.fromURL(urlFile, (image) => {
      image.scaleToWidth(100);
      image.scaleToHeight(100);
      canvas.add(image);
      canvas.renderAll();
    });
    e.target.value = "";
  };

  const drawRectHandler = (canvi) => {
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      fill: color,
    });
    canvi.add(rect);
    canvi.renderAll();
  };
  const drawCircleHandler = (canvi) => {
    const circle = new fabric.Circle({
      radius: 25,
      fill: color,
    });
    canvi.add(circle);
    canvi.renderAll();
  };

  const drawTextBoxHandler = (canvi) => {
    const text = new fabric.Textbox("Text", {
      width: 50,
      height: 50,
      fill: color,
    });
    canvi.add(text);
    canvi.renderAll();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "min-content",
      }}
    >
      <StDiv>
        <canvas ref={canvasRef} />;
      </StDiv>
      <StMenu>
        {isDrawing ? (
          <TbBrush onClick={freeDrawHandler} />
        ) : (
          <GrSelect onClick={freeDrawHandler} />
        )}
        <BiSquare
          onClick={() => {
            drawRectHandler(canvas);
          }}
        />

        <BiCircle
          onClick={() => {
            drawCircleHandler(canvas);
          }}
        />

        <BiText
          onClick={() => {
            drawTextBoxHandler(canvas);
          }}
        />
        <input
          type="color"
          onChange={(e) => {
            drawColorHandler(e.target.value);
            setColor(e.target.value);
          }}
        />
        <input
          type="range"
          defaultValue="5"
          step="3"
          min="5"
          max="17"
          onChange={(e) => {
            drawWidthHandler(e.target.value);
          }}
        />

        <input
          style={{ display: "none" }}
          accept="image/*"
          id="files"
          name="img_url"
          type="file"
          content_type="multipart/form-data"
          ref={ImgInput}
          onChange={imgUpload}
        />

        <RiImageAddFill
          onClick={() => {
            ImgInput.current.click();
          }}
        />
        <RiDeleteBinLine onClick={clearButtonHandler} />
      </StMenu>
    </div>
  );
};

export default Canvas;

const StDiv = styled.div`
  width: 35rem;
  height: 35rem;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
  position: relative;
`;

const StMenu = styled.div`
  width: 100%;
  height: 3rem;
  ${flex("space-evenly", "", "row")}
  flex-wrap: wrap;
  font-size: 2rem;
  margin: 1rem 0;
`;
