import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    color: var(--black);
    -ms-overflow-style: none;
    scrollbar-width: none;
    font-family: 'Noto Sans KR', sans-serif;
    ::-webkit-scrollbar {
      display:none;
    }
  }

  a {
    text-decoration:none;
    color: inherit;
  }


`;

export default GlobalStyle;
