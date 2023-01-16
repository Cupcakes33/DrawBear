import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";

const Canvas = ({ canvas, setCanvas }) => {
  // const [canvas, setCanvas] = useState("");
  const [color, setColor] = useState("black");
  const [width, setWidth] = useState(5);
  const canvasRef = useRef(null);
  const bgImgInput = useRef();
  const productImgInput = useRef();

  const imgUrlConvertBlob = () => {
    if (!canvas) return;
    const canvasUrl = canvas.toDataURL();
    const image = atob(canvasUrl.split(",")[1]);
    const arraybuffer = new ArrayBuffer(image.length);
    const view = new Uint8Array(arraybuffer);

    for (let i = 0; i < image.length; i++) {
      view[i] = image.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([arraybuffer], { type: "image/png" });
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas(canvasRef.current, {
      height: 350,
      width: 350,
      backgroundColor: "white",
      freeDrawingBrush: {
        color: color,
        width: width,
      },
    });

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

  const freeDrawHandler = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    canvas.freeDrawingBrush.inverted = false;
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
        <button onClick={freeDrawHandler}>freedraw</button>
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
          type="color"
          onChange={(e) => {
            drawColorHandler(e.target.value);
            setColor(e.target.value);
          }}
        />
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
  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */
  position: relative;
`;

const StMenu = styled.div`
  width: 100%;
  height: 10rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;
