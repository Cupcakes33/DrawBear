import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { diaryType } from "../../redux/modules/diarySlice";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeSoloView = () => {
    dispatch(diaryType({ solo: true, couple: false, favorite: false }));
    navigate("/");
  };

  const changeCoupleView = () => {
    dispatch(diaryType({ solo: false, couple: true, favorite: false }));
    navigate("/");
  };

  const changeFavoriteView = () => {
    dispatch(diaryType({ solo: false, couple: false, favorite: true }));
    navigate("/");
  };

  return (
    <Container>
      <FooterButton onClick={changeSoloView}>혼자</FooterButton>
      <FooterButton onClick={changeCoupleView}>같이</FooterButton>
      <FooterButton onClick={changeFavoriteView}>책갈피</FooterButton>
      <FooterButton>마이</FooterButton>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.2rem;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const FooterButton = styled.button`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
`;
