import axios from 'axios';
import React, { useState, ChangeEvent} from 'react';
import styled from 'styled-components';
import TaskData from "./../../Interfaces/ITaskData.ts"

const StyledAdd = styled.div`
    height: 30vh;
    width: 100%;
    & * {
        width: 100%;
    }
    & > *:nth-child(2) {
        height: 200px;
    }
`;


const StyledTitleInput = styled.input`
    /* background-color: red; */
    border: 0;
    
    
`;
const StyledDescriptionInput = styled.input`
    border: 0;
    width: 100%;
    /* color: green; */
`;


const StyledSubmit = styled.input`
    border: 0;
`


const AddTaskCard: React.FC = () => {

    const [taskData, setTaskData] = useState<TaskData>({ title: '', description: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Event handler for input changes
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTaskData({ ...taskData, [name]: value });
    };

    // Event handler for form submission
    const handleSubmit = async () => {//event: FormEvent
        // event.preventDefault(); // Prevent page refresh
        setLoading(true);
        setError(null);

        try {
            // Send POST request to backend
            await axios.post('http://localhost:3000/', taskData);
            

        } catch (error) {
            if (axios.isAxiosError(error)) {
                //todo: handling error here
                console.log("error here");

                // setError(axiosError.response?.data || axiosError.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <StyledAdd >
                <StyledTitleInput
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={taskData.title}
                    onChange={handleChange}
                    style={{ fontSize: '24px' }}
                />
                <StyledDescriptionInput
                    
                    name="description"
                    placeholder="Description"
                    value={taskData.description}
                    onChange={handleChange}
                />
                <StyledSubmit onClick={()=> handleSubmit()}  type="submit" name="submit" value="Submit" />
            </StyledAdd>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </>
    );
};

export default AddTaskCard;
