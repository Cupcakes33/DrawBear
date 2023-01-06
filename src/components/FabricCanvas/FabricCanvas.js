import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";

const FabricCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const [color, setColor] = useState("black");
  const [width, setWidth] = useState(5);
  const canvasRef = useRef(null);
  const bgImgInput = useRef();
  const productImgInput = useRef();

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const deleteSelectedObjects = () => {
    let selection = canvas.getActiveObject();

    if (selection._objects) {
      selection.forEachObject((obj) => {
        console.log(obj);
        canvas.remove(obj);
      });
    } else {
      canvas.remove(selection);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Delete") {
        deleteSelectedObjects();
      }
    });
    return () =>
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Delete") {
          deleteSelectedObjects();
        }
      });
  }, [canvas]);

  const initCanvas = () =>
    new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 500,
      backgroundColor: "white",
      freeDrawingBrush: {
        color: color,
        width: width,
      },
    });

  const freeDrawHandler = () => {
    console.log(canvas.freeDrawingBrush.width, canvas.freeDrawingBrush.color);
    canvas.isDrawingMode = !canvas.isDrawingMode;
  };

  const drawColorHandler = (color) => {
    canvas.freeDrawingBrush.color = color;
  };
  const drawWidthHandler = (width) => {
    canvas.freeDrawingBrush.width = parseInt(width, 10);
  };
  const clearButtonHandler = () => {
    canvas.clear();
  };

  const bgUpload = (e) => {
    const { files } = e.target;
    const urlFile = URL.createObjectURL(files[0]);

    canvas.setBackgroundImage(urlFile, canvas.renderAll.bind(canvas), {
      width: canvas.width,
      height: canvas.height,
      originX: "left",
      originY: "top",
    });

    e.target.value = "";
  };

  const imgUpload = (e) => {
    const { files } = e.target;
    const urlFile = URL.createObjectURL(files[0]);
    new fabric.Image.fromURL(urlFile, (image) => {
      canvas.add(image);
      canvas.renderAll();
    });
    e.target.value = "";
  };

  const drawRectHandler = (canvi) => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: color,
    });
    canvi.add(rect);
    canvi.renderAll();
  };
  const drawCircleHandler = (canvi) => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: color,
    });
    canvi.add(circle);
    canvi.renderAll();
  };

  const drawTextBoxHandler = (canvi) => {
    const text = new fabric.Textbox("Text", {
      width: 100,
      height: 100,
      fill: color,
    });
    canvi.add(text);
    canvi.renderAll();
  };

  return (
    <>
      <StMenu>
        <button onClick={freeDrawHandler}>freedraw</button>
        <input
          type="color"
          onChange={(e) => {
            drawColorHandler(e.target.value);
            setColor(e.target.value);
          }}
        />
        <button
          onClick={() => {
            drawRectHandler(canvas);
          }}
        >
          rect
        </button>
        <button
          onClick={() => {
            drawCircleHandler(canvas);
          }}
        >
          circle
        </button>
        <button
          onClick={() => {
            drawTextBoxHandler(canvas);
          }}
        >
          Text Box
        </button>
        <input
          type="range"
          defaultValue="1"
          min="1"
          max="10"
          onChange={(e) => {
            drawWidthHandler(e.target.value);
            setWidth(e.target.value);
          }}
        />
        <button onClick={clearButtonHandler}>clear</button>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="files"
          name="img_url"
          type="file"
          content_type="multipart/form-data"
          ref={bgImgInput}
          onChange={bgUpload}
        />
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="files"
          name="img_url"
          type="file"
          content_type="multipart/form-data"
          ref={productImgInput}
          onChange={imgUpload}
        />
        <div>
          <button
            onClick={() => {
              bgImgInput.current.click();
            }}
          >
            배경
          </button>
          <button
            onClick={() => {
              productImgInput.current.click();
            }}
          >
            이미지
          </button>
        </div>
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
