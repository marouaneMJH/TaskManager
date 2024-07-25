import React, { useState } from "react";
import styled from "styled-components";
import RowContainer from "./RowContainer";

const StyledColumn = styled.table`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    /* height: 80dvh; */
    background-color: red;
    max-width: 284px;
    min-width: 284px;
`;

const Column: React.FC<{ title: string }> = ({ title }) => {
    const [data, setData] = useState()
    return (
        <StyledColumn>
            <thead>
                <tr>
                    <td>{title}</td>
                </tr>
            </thead>
            {/* row container */}
            {/* todo just for testing */}
            <RowContainer />
        </StyledColumn>
    );
};

export default Column;
