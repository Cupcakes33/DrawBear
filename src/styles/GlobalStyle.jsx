import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
  }

  a {
    text-decoration:none;
    color: inherit;
  }
`;

export default GlobalStyle;
