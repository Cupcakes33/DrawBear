import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";

const NavigateBtn = ({ prev, link, sizeType }) => {
  const navigate = useNavigate();

  return (
    <StNavigateBtnContainer sizeType={sizeType}>
      {prev ? (
        <GrPrevious
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : (
        <GrNext
          onClick={() => {
            navigate(`${link}`);
          }}
        />
      )}
    </StNavigateBtnContainer>
  );
};

export default NavigateBtn;

const sizeTypes = {
  header: {
    size: "2.4rem",
    width: "3rem",
    height: "3rem",
  },
  section: {
    size: "1.8rem",
    width: "2.2rem",
    height: "2.2rem",
  },
};

const sizeStyle = css`
  ${({ sizeType }) => css`
    font-size: ${sizeTypes[sizeType]?.size};
    width: ${sizeTypes[sizeType]?.width};
    height: ${sizeTypes[sizeType]?.height};
  `}
`;

const StNavigateBtnContainer = styled.span`
  cursor: pointer;
  ${sizeStyle}
`;

// 네비게이션 버튼에 아이콘 모양을 바꾸는 기능도 필요하면 추가하겠습니다.
