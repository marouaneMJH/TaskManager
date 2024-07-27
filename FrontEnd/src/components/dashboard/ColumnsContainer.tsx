import React from "react";
import styled from "styled-components";
import Column from "./Column";

const StyledColumnsContainer = styled.div`
    display: flex;
    /* flex-direction: row; */
    align-items: center;
    /* justify-content: space-around; */
    gap:2rem;
    
    height: 100vh;
    width: 100vw;
    //todo more styling
`;

const ColumnsContainer: React.FC<{ title: string }> = ({ title }) => {
    //request to DB for the dashboard infos
    /**
     * @var string title
     * @var string <title of columns>
     */
    // const [, setColumnName] = useState<string>([]);




    return (
        <>
            <h1>{title}</h1>
            <StyledColumnsContainer>
                <Column title="todo"/>
                <Column title="doing"/>
                <Column title="done"/>
            </StyledColumnsContainer>
        </>
    );
};

export default ColumnsContainer;
