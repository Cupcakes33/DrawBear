import { useLocation } from "react-router";
import styled from "styled-components";

const Layout = ({ children }) => {
  const location = useLocation();

  const { pathname } = location;
  console.log(pathname.indexOf("setting"));

  const LayoutbackgrounColor = () => {
    if (pathname === "/login" || pathname === "/signup") return "#eef3e3";
    else if (pathname === "/") return "#F8F8F8";
    else return "white";
  };

  return <LayoutContainer bgColor={LayoutbackgrounColor}>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  width: 36rem;
  height: 100%;
  min-height: 100vh;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.1);
  background-color: ${({ bgColor }) => bgColor};
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;
