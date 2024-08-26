import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "@/api/axios"
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import {
    StyledCloseIcon,
    StyledContainer,
    StyledInput,
    StyledSecondContainer,
} from "../TitleInput";

import { toggleCardState } from "../../state/Reload/pageReload";

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

const StyledButton = styled(Button)`
    &:hover::after {
        content: 'add';
        position: absolute;
        left: 70px;
        bottom: 30px;
        background-color: #333;
        color: #fff;
        padding: 5px 8px;
        border-radius: 4px;
        white-space: nowrap;
        z-index: 1;
        font-size: 9px;
    }
`;


const AddCard: React.FC<{ listID: number }> = ({ listID }) => {
    const [click, setClick] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>("");
    const [postClick, setPostClick] = useState<boolean>(false);
    const dispatch = useDispatch();


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
                    dispatch(toggleCardState());
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
                        <StyledButton
                            onClick={() => setPostClick(true)}
                            variant="contained"
                            type="submit"
                        >
                            <AddIcon fontSize="small" />
                        </StyledButton>
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
