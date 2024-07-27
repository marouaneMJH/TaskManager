import React from 'react'
import styled from 'styled-components';
import Card from './Card';
import AddCard from "./AddCard";



const StyledCardContainer = styled.ul`
    display: flex;
    flex-direction: column;
    padding: .08rem;
    background-color: #1e361e;
    list-style: none;
    gap: 0.3rem;
    border-radius: 20px;
`;


const CardContainer:React.FC= ()=>{
    return (
        <StyledCardContainer>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/> 
            <AddCard/>
        </StyledCardContainer>
    )
}


export default CardContainer;