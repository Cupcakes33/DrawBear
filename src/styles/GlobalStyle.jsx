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
    font-weight: 700;
    text-decoration:none;
    color: inherit;
  }
`;

export default GlobalStyle;
