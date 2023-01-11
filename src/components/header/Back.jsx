import { useNavigate } from "react-router";
import styled from "styled-components";

const Back = () => {
  const navigate = useNavigate();
  return <Stbutton onClick={() => navigate(-1)}>{"<"}</Stbutton>;
};

export default Back;

const Stbutton = styled.button`
  border: 0;
  padding: 2rem 1rem 2rem 2rem;
  cursor: pointer;
`;
