import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "@/api/axios";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {
    StyledCloseIcon,
    StyledContainer,
    StyledInput,
    StyledSecondContainer,
} from "../TitleInput";
import { toggleListState } from "../../state/Reload/pageReload";

const StyledAddList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 0 0 0 1rem;
    min-width: 18rem;
    background-color: #1e361e;
    list-style: none;
    border-radius: 20px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        background-color: #fff;
    }
`;
const StyledActiveAddList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    min-width: 18rem;
    background-color: #fff;
    border-radius: 20px;
    transition: all 0.3s;
`;

const AddList: React.FC = () => {
    const [click, setClick] = useState<boolean>(false);
    const [listName, setListName] = useState<string>("");
    const [postClick, setPostClick] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const postNewTask = async () => {
            const dashBoardID = 1;
            try {
                const title = listName;
                if (postClick == true) {
                    await axios.post(
                        `http://localhost:3000/addList/${dashBoardID}`,
                        {
                            title,
                        }
                    );
                    setPostClick(false);
                    setListName("");
                    dispatch(toggleListState());
                }
            } catch {
                console.error("Failed to post new task");
            }
        };

        postNewTask();
    }, [postClick]);

    if (click == false) {
        return (
            <StyledAddList onClick={() => setClick(true)}>
                <AddIcon fontSize="small" />
                <p>Add List </p>
            </StyledAddList>
        );
    } else {
        return (
            <StyledActiveAddList>
                <StyledContainer>
                    <StyledInput
                        type="text"
                        onChange={(e) => {
                            setListName(e.target.value);
                        }}
                        value={listName}
                        placeholder="enter your list name"
                    />
                    <StyledSecondContainer>
                        <Button
                            onClick={() => {
                                setPostClick(true);
                            }}
                            variant="contained"
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                        <StyledCloseIcon
                            onClick={() => setClick(false)}
                            fontSize="medium"
                        />
                    </StyledSecondContainer>
                </StyledContainer>
            </StyledActiveAddList>
        );
    }
};

export default AddList;
