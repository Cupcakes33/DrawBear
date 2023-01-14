import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";

const NavigateBtn = ({ prev, link, sizeType }) => {
  const navigate = useNavigate();

  return (
    <StNavigateBtnContainer sizeType={sizeType}>
      {prev ? (
        <GrPrevious
          style={{ marginRight: "10px" }}
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
    size: "24px",
  },
  section: {
    size: "18px",
  },
};

const sizeStyle = css`
  ${({ sizeType }) => css`
    font-size: ${sizeTypes[sizeType]?.size};
  `}
`;

const StNavigateBtnContainer = styled.span`
  cursor: pointer;
  ${sizeStyle}
`;

// 네비게이션 버튼에 아이콘 모양을 바꾸는 기능도 필요하면 추가하겠습니다.
