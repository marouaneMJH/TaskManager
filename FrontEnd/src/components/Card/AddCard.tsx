import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {
    StyledCloseIcon,
    StyledContainer,
    StyledInput,
    StyledSecondContainer,
} from "../TitleInput";

const StyledAddCard = styled.li`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    background-color: #1e361e;
    padding: 0 1rem;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
    outline: none;
    &:hover {
        background-color: #0f1e0f;
        cursor: pointer;
    }
`;

const AddCard: React.FC<{ listID: number }> = ({ listID }) => {
    const [click, setClick] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>("");
    const [postClick, setPostClick] = useState<boolean>(false);

    ///todo pup-up function

    useEffect(() => {
        const postNewTask = async () => {
            try {
                const title = taskName;
                if (postClick == true) {
                    await axios.post(
                        `http://localhost:3000/addTask/${listID}`,
                        {
                            title,
                        }
                    );
                    setPostClick(false);
                    setTaskName("");
                }
            } catch {
                console.error("Failed to post new task");
            }
        };

        postNewTask();
    }, [postClick]);

    if (click == false)
        return (
            <StyledAddCard onClick={() => setClick(!click)}>
                <AddIcon />
                <p>Add Card</p>
            </StyledAddCard>
        );
    else
        return (
            <StyledAddCard>
                <StyledContainer>
                    <StyledInput
                        type="text"
                        placeholder="enter task name"
                        value={taskName}
                        onChange={(e) => {
                            setTaskName(e.target.value);
                        }}
                    />
                    <StyledSecondContainer>
                        <Button
                            onClick={() => setPostClick(true)}
                            variant="contained"
                            type="submit"
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                        <StyledCloseIcon
                            onClick={() => setClick(false)}
                            fontSize="medium"
                        />
                    </StyledSecondContainer>
                </StyledContainer>
            </StyledAddCard>
        );
};

export default AddCard;
