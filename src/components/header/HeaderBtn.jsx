import { useNavigate } from "react-router";
import styled from "styled-components";

export const HeaderBtn = ({ children }) => {
  const navigate = useNavigate();
  return <Stbutton onClick={() => navigate("/")}>{children}</Stbutton>;
};

export default HeaderBtn;

const Stbutton = styled.button`
  border: 0;
  cursor: pointer;
`;
