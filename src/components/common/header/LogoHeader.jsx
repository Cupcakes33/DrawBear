import React from "react";
import styled from "styled-components";
import { Header } from "./Header";
import loadingBear from "../../../assets/images/loadingBear.webp";

const LogoHeader = () => {
  return (
    <Header height="7.6rem" bgColor="#f8f8f8">
      <Header.Center>
        <LogoBear src={loadingBear} alt="로고 곰돌이" />
      </Header.Center>
    </Header>
  );
};

export default LogoHeader;

const LogoBear = styled.img`
  width: 5.2rem;
`;
