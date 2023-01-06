import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";

const FabricCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const canvasRef = useRef(null);
  const [bgImg, setBgImg] = useState("");
  const [productImg, setProductImg] = useState("");
  const bgImgInput = useRef();
  const productImgInput = useRef();

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 500,
      backgroundColor: "white",
    });

  const freeDrawHandler = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
  };

  const drawColorHandler = (color) => {
    // canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = color;
  };
  const drawWidthHandler = (width) => {
    // canvas.freeDrawingBrush.width = width;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = width;
  };
  const clearButtonHandler = () => {
    canvas.clear();
  };

  const bgUploadButtonClick = (e) => {
    bgImgInput.current.click();
  };

  const productUploadButtonClick = (e) => {
    productImgInput.current.click();
  };

  const bgUpload = (e) => {
    const { files } = e.target;
    const urlFile = URL.createObjectURL(files[0]);
    console.log(urlFile);
    setBgImg(
      canvas.setBackgroundImage(urlFile, canvas.renderAll.bind(canvas), {
        width: canvas.width,
        height: canvas.height,
        originX: "left",
        originY: "top",
      })
    );
    e.target.value = "";
  };

  const productUpload = (e) => {
    const { files } = e.target;
    const urlFile = URL.createObjectURL(files[0]);
    new fabric.Image.fromURL(urlFile, (image) => {
      canvas.add(image);
      canvas.renderAll();
      setProductImg(image);
    });
    e.target.value = "";
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
          onChange={productUpload}
        />
        <div>
          <button onClick={bgUploadButtonClick}>배경 업로드</button>
          <button onClick={productUploadButtonClick}>이미지 업로드</button>
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
