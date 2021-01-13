import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyle = createGlobalStyle`
    ${reset};
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Binggrae;
        color: white;
    }
    
    body {
        width: 100%;
        height: 100vh;
        background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("background.jpg");
        background-size: cover;
        background-position: center;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    @font-face {
        font-family: "Binggrae";
        src: url("BinggraeMelona.ttf") format("truetype");
        font-style: normal;
        font-weight: normal;
    }
`;

export default globalStyle;
