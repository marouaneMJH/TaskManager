import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Style } from "@mui/icons-material";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
`;

const StyledSecondContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 0.5rem;
    justify-content: space-between;
    width: 100%;
`;

const StyledInput = styled.input`
    padding: 15px 10px;
    /* outline: none; */
    border: none;   
    border-radius: 4px;
`;

const StyledCloseIcon = styled(CloseIcon)`
    background-color: #fff;;
    border-radius: 4px;
    padding: .1rem;
    &:hover {
        background-color: red;
    }
`;

const TitleInput: React.FC<{ title: string }> = ({ title }) => {
    return (
        <StyledContainer>
            <StyledInput type="text" placeholder={title} />
            <StyledSecondContainer>
                <Button variant="contained">
                    <AddIcon fontSize="small" />
                </Button>
                <StyledCloseIcon fontSize="medium" />
            </StyledSecondContainer>
        </StyledContainer>
    );
};

export default TitleInput;
