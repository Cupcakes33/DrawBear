import {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
  useContext,
  createContext,
} from "react";
import styled, { css, keyframes } from "styled-components";
const DropdownContext = createContext();

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);
  const values = useMemo(
    () => ({ isOpen, dropdownRef, toggle, toggleRef }),
    [isOpen, dropdownRef, toggle, toggleRef]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (toggleRef.current && !toggleRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <DropdownContext.Provider value={values}>
      {children}
    </DropdownContext.Provider>
  );
};

const DropdownToggle = ({ children }) => {
  const { toggle, toggleRef } = useContext(DropdownContext);
  return (
    <span onClick={toggle} ref={toggleRef}>
      {children}
    </span>
  );
};

const DropdownContainer = ({ children }) => {
  const { isOpen } = useContext(DropdownContext);

  return (
    <Container isOpen={isOpen} className={`${isOpen ? "fade-in" : "fade-out"}`}>
      {children}
    </Container>
  );
};

const DropdownWrapper = ({ children }) => {
  const { dropdownRef } = useContext(DropdownContext);
  return <ul ref={dropdownRef}>{children}</ul>;
};

const DropdownMenu = ({ children }) => {
  return <li>{children}</li>;
};

Dropdown.Menu = DropdownMenu;
Dropdown.Wrapper = DropdownWrapper;
Dropdown.Toggle = DropdownToggle;
Dropdown.Container = DropdownContainer;
export default Dropdown;

const fadeIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const Container = styled.div`
  width: min-content;
  height: min-content;
  position: relative;
  display: none;
  cursor: pointer;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}

  ul {
    position: absolute;
    top: 1rem;
    left: 0rem;
    width: min-content;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    z-index: 10;
    

    li {
      list-style: none;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #fafafa;

      &:hover {
        background: #f8f9fa;
      }
    }
  }

  &.fade-in {
    ul {
      animation: ${fadeIn} 0.4s ease;
    }
  }

  &.fade-out {
    ul {
      animation: ${fadeOut} 0.4s ease;
    }
  }
`;

