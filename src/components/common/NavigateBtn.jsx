import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";

const NavigateBtn = ({ prev, link, sizeType }) => {
  const navigate = useNavigate();

  return (
    <Button sizeType={sizeType}>
      {prev ? (
        <GrPrevious
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : (
        <GrNext
          onClick={() => {
            navigate(`/${link}`);
          }}
        />
      )}
    </Button>
  );
};

export default NavigateBtn;

const sizeTypes = {
  header: {
    type: "24px",
  },
  section: {
    type: "18px",
  },
};

const sizeStyle = css`
  ${({ sizeType }) => css`
    font-size: ${sizeTypes[sizeType].type};
  `}
`;

const Button = styled.div`
  cursor: pointer;
  ${sizeStyle}
`;
