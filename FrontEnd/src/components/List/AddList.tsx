import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import TitleInput from "../TitleInput";

const StyledAddList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 0 0 0 1rem;
    min-width: 18rem;
    background-color: #1e361e;
    list-style: none;
    border-radius: 20px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        background-color: #fff;
    }
`;
const StyledActiveAddList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: .5rem;
    min-width: 18rem;
    background-color: #fff;
    border-radius: 20px;
    transition: all 0.3s;
`;

const AddList: React.FC = () => {
    const [click, setClick] = useState<boolean>(false);
    if (click == false) {
        return (
            <StyledAddList onClick={() => setClick(true)}>
                <AddIcon fontSize="small" />
                <p>Add List </p>
            </StyledAddList>
        );
    } else {
        return (
            <StyledActiveAddList onClick={() => setClick(!click)}>
                <TitleInput title={"Enter name for this List"}/>
            </StyledActiveAddList>
        );
    }
};

export default AddList;
