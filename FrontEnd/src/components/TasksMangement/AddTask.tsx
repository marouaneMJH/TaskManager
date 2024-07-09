import React, { useState } from "react";
import AddTaskCard from './AddTaskCard'
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';

// type Props = {}
const StyledAddTaskContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 28px;
    height: 30px;
    /* border: 1px dotted black; */
    border-radius: 4px;
    /* background-color: #d3d3d336; */
    transition: .3s all ease-in-out;
    

    &:hover {
        background-color: #d3d3d3;
        cursor: pointer;
    }
`;

const StyledAddTask = styled.div`
    transition: 0.3s all ease-in-out   ;
`;



const AddTask: React.FC = () => {
    const [addCondition, setAddCondition] = useState(false);

    return (
        <StyledAddTask onClick={() => setAddCondition(true)} onMouseLeave={() => setAddCondition(true)}>
            {/*todo make it false */} 
            {addCondition ? (
                <AddTaskCard />
            ) : (
                <StyledAddTaskContainer><AddIcon /> </StyledAddTaskContainer>
            )}
        </StyledAddTask>
    );
};

export default AddTask;
