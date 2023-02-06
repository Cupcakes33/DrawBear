import { useLocation } from "react-router";
import styled from "styled-components";

const Layout = ({ children }) => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <>
      {pathname === "/login" || pathname === "/signup" ? (
        <LayoutContainer bgColor="#eef3e3">{children}</LayoutContainer>
      ) : (
        <LayoutContainer>{children}</LayoutContainer>
      )}
    </>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  width: 36rem;
  height: 100%;
  min-height: 100vh;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#F8F8F8")};
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;
