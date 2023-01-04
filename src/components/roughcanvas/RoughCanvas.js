import { useEffect, useState, useRef } from "react";
import rough from "roughjs/bundled/rough.esm";

const RoughCanvas = () => {
  const canvasRef = useRef();
  const generator = rough.generator();
  const [elements, setElements] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [elementType, setElementsType] = useState("line");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";

    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughcanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughcanvas.draw(roughElement));
  }, [elements]);

  // create Line
  const createElement = (x1, y1, x2, y2, type) => {
    let roughElement;
    switch (type) {
      case "line":
        roughElement = generator.line(x1, y1, x2, y2);
        break;
      case "rect":
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        break;
      default:
        roughElement = generator.line(x1, y1, x2, y2);
        break;
    }
    // type === "line"
    //   ? generator.line(x1, y1, x2, y2)
    //   : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
    return { x1, y1, x2, y2, roughElement };
  };

  const canvasMouseDownHandler = (event) => {
    setIsDraw(true);
    const { clientX, clientY } = event;
    console.log(clientX, clientY);
    const element = createElement(
      clientX,
      clientY,
      clientX,
      clientY,
      elementType
    );
    setElements((prev) => [...prev, element]);
  };
  const canvasMouseMoveHandler = (event) => {
    if (!isDraw) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY, elementType);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };
  const canvasMouseUpHandler = () => {
    setIsDraw(false);
  };
  const canvasMouseLeaveHandler = () => {
    setIsDraw(false);
  };

  return (
    <div>
      <div style={{ position: "fixed" }}>
        <input
          type="radio"
          id="line"
          checked={elementType === "line"}
          onChange={() => {
            setElementsType("line");
          }}
        />
        <label htmlFor="line">Line</label>
        <input
          type="radio"
          id="rect"
          checked={elementType === "rect"}
          onChange={() => {
            setElementsType("rect");
          }}
        />
        <label htmlFor="line">rect</label>
      </div>
      <canvas
        ref={canvasRef}
        width={`500px`}
        height={`500px`}
        style={{ border: "1px solid black" }}
        onMouseDown={canvasMouseDownHandler}
        onMouseMove={canvasMouseMoveHandler}
        onMouseUp={canvasMouseUpHandler}
        onMouseLeave={canvasMouseLeaveHandler}
      />
    </div>
  );
};

export default RoughCanvas;
