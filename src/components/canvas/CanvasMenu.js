import styled from "styled-components";

const CanvasMenu = ({ setLineColor, setLineWidth, setLineOpacity }) => {
  return (
    <StCanvasMenu>
      <label>Brush Color</label>
      <input
        type="color"
        onChange={(event) => {
          setLineColor(event.target.value);
        }}
      />
      <label>Brush Width</label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(event) => {
          setLineWidth(event.target.value);
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(event) => {
          setLineOpacity(event.target.value / 100);
        }}
      />
    </StCanvasMenu>
  );
};

export default CanvasMenu;

const StCanvasMenu = styled.div`
  width: 650px;
  height: 50px;
  position: absolute;
  bottom: -55px;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  border: 1px solid black;
  margin: auto;
`;
