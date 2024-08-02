/*
    this is the edit card page
*/
import React, { useState } from "react";
import styled from "styled-components";

import TitleIcon from "@mui/icons-material/Title";
import CloseIcon from "@mui/icons-material/Close";
import NotesIcon from "@mui/icons-material/Notes";

// import { TextArea } from "@instructure/ui-text-area";

import TextArea from "./../UI/TextArea";
import TaskData from "./../../Interfaces/ITaskData";

const StyledBigCard = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    height: 80%;
    width: 80%;
    background-color: #31580d;
    z-index: 10;
    overflow: hidden;
    padding: 1rem;
    border-radius: 10px;
    & > * {
        width: 80%;
    }
`;

const StyledBigCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    /* padding: px; */
`;

const StyledBigCardTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StyledBigCardContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

const BigCard: React.FC<TaskData> = ({ id,title }) => {
    const [clicked, setClicked] = useState<boolean>(false);
    return (
        <StyledBigCard>
            <StyledBigCardHeader>
                <StyledBigCardTitle>
                    <TitleIcon />
                    <h3>{title} this is the id {id}</h3>
                </StyledBigCardTitle>
                <CloseIcon />
            </StyledBigCardHeader>
            <StyledBigCardContent>
                <StyledBigCardTitle>
                    <NotesIcon />
                    <h3>Description</h3>
                </StyledBigCardTitle>
                {clicked ? (
                    <TextArea $heightRem={10} $widthPer={100} />
                ) : (
                    <TextArea onClick={() => setClicked(!clicked)} />
                )}
            </StyledBigCardContent>
            <StyledBigCardContent>
                <StyledBigCardTitle>
                    <NotesIcon />
                    <h3>Activity</h3>
                </StyledBigCardTitle>
                <TextArea />
            </StyledBigCardContent>
        </StyledBigCard>
    );
};

export default BigCard;
