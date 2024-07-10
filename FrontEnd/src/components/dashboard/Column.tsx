import React from 'react'
import styled from 'styled-components';


const StyledColumn= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    height: 80dvh;
    background-color: red;
    max-width: 284px;
    min-width: 284px;
    
`

const Column: React.FC<{title:string}>= ({title})=>{
    return(
        <StyledColumn>
            <h2>{title}</h2>
            {/* {rows} */}
        </StyledColumn>
    )
}


export default Column;