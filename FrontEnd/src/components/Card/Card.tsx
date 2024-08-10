import React, { useState } from "react";
import styled from "styled-components";
import TaskData from "../../Interfaces/Card";

import BigCard from "./BigCard";

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

const Card: React.FC<TaskData> = ({ cardID, cardTitle }) => {
    const [click, setClick] = useState<boolean>(false);
    return (
        <StyledCard onClick={() => setClick(true)}>
            {cardTitle}

            {click && <BigCard cardTitle={cardTitle} cardID={cardID} />}
        </StyledCard>
    );
};

export default Card;
