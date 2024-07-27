import React from "react";
import styled from "styled-components";


const StyledCard = styled.li`
    background-color: #0f1e0f;
    padding: 0.7rem;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
    outline: none;
    &:hover {
        background-color: #334d33;
        cursor: pointer;
    }


`;

const Card: React.FC = () => {
    return <StyledCard>List one</StyledCard>;
};

export default Card;
