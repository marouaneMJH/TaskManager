import React from "react";
import styled from "styled-components";
import AddList from "./AddList";
import List from "./List";

const StyledListContainer= styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f17575;
    align-items: start;
    width: 100vw;
    padding: 1rem;
    overflow-x: auto;
    gap: 20px;

`;


const ListContainer: React.FC = () => {
    //todo the title of all List 

    return (

        <StyledListContainer>
            <List/>
            <List/>
            <List/>
            <List/>
            <AddList/>
        </StyledListContainer>
    );
};

export default ListContainer;
