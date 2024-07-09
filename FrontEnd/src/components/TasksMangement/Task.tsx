import React, { ReactNode } from "react";
import styled from "styled-components";
import TaskData from "../../Interfaces/ITaskData";

interface StyledProp {
    children?: ReactNode;
    className?: string;
}
// const StyledTask = styled.div<StyledProp>`
//     display: flex;
//     flex-direction: column;
//     align-items: start;
//     justify-content: center;
//     width: 28vw;
//     border: 1px solid gray;
//     border-radius: 5px;
//     padding-left: 50px;
//     & > * {
//         width: 100%;
//         transition: all 0.3s;
//         border-bottom: 0px solid gray;
//         border-radius : 50% ;

//     }
//     & > *:not(:first-child):hover {
//         border-radius : 0 ;
//         border-bottom: 1px solid gray;
//     }
// `;

const StyledTask = styled.div<StyledProp>`
    display: flex;
    width: 100%;
    align-items: center;
`;

const Cup = styled.div<StyledProp>`
    height: 30px;
    width: 30px;
    background-color: red;
    margin-right: 1rem;
    border: solid blue ;
    border-bottom-width: 4px ;
    border-radius: 50%;
    transition: all .3s ease-in-out;
    &:hover {
        background-color: blue;
    }
`;


const Task: React.FC<{ props: TaskData |undefined }> = ({ props }) => {

    if (props != undefined)
        return (
            <StyledTask>
                <Cup />
                <h3>{props.title} </h3>
            </StyledTask>
        );
    else
        return (
            <StyledTask>
                <Cup />
                <h3>Error</h3>
            </StyledTask>
        );
};

export default Task;

// styled
