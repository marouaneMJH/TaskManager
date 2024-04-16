import React from 'react'
import Components from './components'
import styled from 'styled-components'

const StyledCardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 10px;
    
`



const CardsContainer: React.FC = () => {
  return (
    <StyledCardsContainer>
        <Components/>
        <Components/>
        <Components/>
    </StyledCardsContainer>
  )
}


export default CardsContainer