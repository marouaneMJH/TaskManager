import React from "react";
import styled from "styled-components";
import CardContainer from "./../Card/CardContainer"


const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 0 1rem ;
    min-width: 18rem;
    background-color: #1e361e;
    list-style: none;
    border-radius: 20px;
`;

const StyledHead = styled.h2`
    color: blue;
    margin: 0;

`;

const List: React.FC = () => {
    return (
        <StyledList>
            <StyledHead>Head one</StyledHead>
            <CardContainer/>
        </StyledList>
    );
};

export default List;
