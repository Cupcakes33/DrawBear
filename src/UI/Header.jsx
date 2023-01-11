import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";

// useEffect의 결과에 따라 실행해서 Header로 값 리턴
//

// 주소에 따라 useCallback 실행 시키도록 조건문

const Header = () => {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const FullList = useCallback(() => {
  //   return (
  //     <>
  //       <Head>
  //         <div>
  //           <LeftDiv>
  //             <button onClick={() => navigate(-1)}>{"<"}</button>
  //             <span>일기 쓰기</span>
  //           </LeftDiv>
  //           <RightDiv>
  //             <button
  //               onClick={() => {
  //                 setIsModal(true);
  //               }}
  //             >
  //               달력
  //             </button>
  //           </RightDiv>
  //         </div>
  //       </Head>
  //       <DummyDiv />
  //     </>
  //   );
  // // }, []);

  // useEffect(() => {
  //   console.log(location);
  // }, []);

  return (
    <>
      {/* {location.pathname === "/list" && FullList()} */}
      {isModal && <Calendar onClose={setIsModal} />}
      <Head>
        <div>
          <LeftDiv>
            <button onClick={() => navigate(-1)}>{"<"}</button>
            <span>일기 쓰기</span>
          </LeftDiv>
          <RightDiv>
            <button
              onClick={() => {
                setIsModal(true);
              }}
            >
              달력
            </button>
          </RightDiv>
        </div>
      </Head>
      <DummyDiv />
    </>
  );
};

export default Header;

const Head = styled.header`
  display: flex;
  align-items: center;
  width: 36rem;
  height: 6rem;
  background-color: #eeeeee;
  border: 1px solid gray;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;

const LeftDiv = styled.div`
  font-weight: 700;
  button {
    border: 0;
    padding: 2rem;
    cursor: pointer;
  }
  span {
    margin-left: 1rem;
  }
`;

const DummyDiv = styled.div`
  height: 6rem;
`;

const RightDiv = styled.div``;
