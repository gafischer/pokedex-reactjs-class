import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    max-width: 1100px;
    margin: 0 auto;
    min-height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: #303030;
    //background: radial-gradient(circle, transparent 20%, #303030 20%, #303030 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #303030 20%, #303030 80%, transparent 80%, transparent) 37.5px 37.5px, linear-gradient(#202124 3px, transparent 3px) 0 -1.5px, linear-gradient(90deg, #202124 3px, #303030 3px) -1.5px 0;
    //background-size: 75px 75px, 75px 75px, 37.5px 37.5px, 37.5px 37.5px;
  }

  body, input, button {
    color: #f3f3f3;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
