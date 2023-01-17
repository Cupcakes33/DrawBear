import { createGlobalStyle } from "styled-components";
import ZigleTTFBold from "../assets/fonts/UhBee_ZIGLE_Bold.ttf";
import ZigleTTF from "../assets/fonts/UhBee_ZIGLE.ttf";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'ZigleTTFBold';
  src: url(${ZigleTTFBold}) format('truetype')
}
 
@font-face {
  font-family: 'ZigleTTF';
  src: url(${ZigleTTF}) format('truetype')
}

  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    color: ${(props) => props.theme.color.font_main}
    /* -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display:none;
    } */
  }
/* 
  input {
    font-family: 
  } */

  a {
    text-decoration:none;
    color: inherit;
  }
  * {
  font-family: 'ZigleTTF' !important;
  }

`;

export default GlobalStyle;
