import React from "react";
import styled from "styled-components";
import Tasks from "./Tasks";

const StyledCardsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 4%;
    flex-direction: row;
    width: 100%;

`;

const CardsContainer: React.FC = () => {
    return (
        <StyledCardsContainer>
            <Tasks
                background="#8080805b"
                title="Not start"

            />
            <Tasks 
                background="#2828f341"
            title="In Progress" />
            <Tasks 
            background="#80f68033"
            title="Done" />
        </StyledCardsContainer>
    );
};

export default CardsContainer;
