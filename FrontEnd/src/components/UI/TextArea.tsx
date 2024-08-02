// import { Height } from "@mui/icons-material";
// import React from "react";
import styled from "styled-components";

//todo use editor js for more functionality
// import { createReactEditorJS } from "react-editor-js";
// const ReactEditorJS = createReactEditorJS();

const StyledTextArea = styled.textarea<{
    $widthPer?: number;
    $heightRem?: number;
}>`
    background-color: #444;
    height: ${(p) => p.$heightRem || 1.5}rem;
    width: ${(p) => (p.$widthPer ? p.$widthPer - 5 : 95)}%;
    border-radius: 6px;
    padding: 1rem;
    resize: none;
`;


// const TextArea = () => {
//     return (
//         <ReactEditorJS>
//             <div id="custom">
//                 hello
//             </div>
//         </ReactEditorJS>
//     );
// };

export default StyledTextArea;
