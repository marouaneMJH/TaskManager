import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

// Define keyframes for the slide-up animation
const slideUp = keyframes`
  0% {
    bottom: -80px;
    opacity: 0;
  }
  50% {
    bottom: 0;
    opacity: 1;
  }
  100% {
    bottom: 10px;
    opacity: 0;
  }
`;

// Styled component with the slide-up animation
const PopUpContainer = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    height: 80px;
    width: 200px;
    border-radius: 5px;
    border-left: solid 10px green;
    background-color: red;
    color: green;
    animation: ${slideUp} 3s 1;
    opacity: 0;
`;

interface PopUpProps {
    message: string;
}

const PopUp: FC<PopUpProps> = ({ message }) => {
    return <PopUpContainer>{message}</PopUpContainer>;
};

export default PopUp;
