import React, { ReactNode } from "react";
import styled from "styled-components";

interface cardProp {
    children?: ReactNode;
    className?: string;
}
const Card = styled.div<cardProp>`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 28vw;
    border: 1px solid gray; 
    border-radius: 5px;
    padding-left: 50px;
    & > * {
        width: 100%;
        transition: all 0.3s;
        border-bottom: 0px solid gray;
        border-radius : 50% ;

    }
    & > *:not(:first-child):hover {
        border-radius : 0 ;
        border-bottom: 1px solid gray;
    }
`;

const Components: React.FC = () => {
    return (
        <Card>
            <h1>Title</h1>
            <p>items1</p>
            <p>items2</p>
            <p>items3</p>
            <p>items4</p>
            <p>items5</p>
        </Card>
    );
};

export default Components;
