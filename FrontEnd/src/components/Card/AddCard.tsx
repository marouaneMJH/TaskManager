import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import TitleInput from "../TitleInput";

const StyledAddCard = styled.li`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    background-color: #1e361e;
    padding: 0 1rem;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
    outline: none;
    &:hover {
        background-color: #0f1e0f;
        cursor: pointer;
    }
`;

const AddCard: React.FC = () => {
    const [click, setClick] = useState<boolean>(false);

    if (click == false)
        return (
            <StyledAddCard onClick={() => setClick(!click)}>
                <AddIcon />
                <p>Add Card</p>
            </StyledAddCard>
        );
    else
        return (
            <StyledAddCard>
                <TitleInput title="Enter title of new card" />
            </StyledAddCard>
        );
};

export default AddCard;
