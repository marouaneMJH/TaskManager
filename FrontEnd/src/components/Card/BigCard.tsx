/*
    this is the edit card page
*/
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import TitleIcon from "@mui/icons-material/Title";
import CloseIcon from "@mui/icons-material/Close";
import NotesIcon from "@mui/icons-material/Notes";

// import { TextArea } from "@instructure/ui-text-area";

import TextArea from "./../UI/TextArea";
import ICard from "../../Interfaces/Card";
import Comment from "../../Interfaces/Comment";
import { Link, useParams } from "react-router-dom";

const StyledBigCard = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 80%;
    width: 80%;
    background-color: #31580d;
    z-index: 10;
    overflow: hidden;
    padding: 1rem;
    border-radius: 10px;
    & > * {
        width: 80%;
    }
`;

const StyledBigCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    /* padding: px; */
`;

const StyledBigCardTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StyledBigCardContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

const StyledCloseIcon = styled(CloseIcon)`
    cursor: pointer;

    &:hover {
        color: red;
    }
`;


const BigCard: React.FC = () => {
    const paramsID = useParams();
    const cardID = paramsID.ID;
    const [clicked, setClicked] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);
    const [cardData, setCardData] = useState<(ICard & Comment) | undefined>(
        undefined
    );

    // Fetch card data
    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const data = await axios.get(
                    `http://localhost:3000/task/${cardID}`
                );
                setCardData(data.data);
                console.log(cardData);
            } catch (error) {
                console.error("Failed to fetch card data", error);
            }
        };

        const postCardDescription = async () => {
            try {
                if (cardData != undefined)
                    await axios.post(`http://localhost:3000/task/${cardID}`, {
                        cardDescription: cardData.cardDescription,
                    });
            } catch (error) {
                console.error("Failed to post card description", error);
            }
        };

        fetchCardData();
        postCardDescription();
    }, [changed]);

    console.log(changed);

    if (cardData == undefined) {
        return;
        <StyledBigCard>
            <h2>Loading</h2>
        </StyledBigCard>;
    } else
        return (
            <StyledBigCard>
                {}
                <StyledBigCardHeader>
                    <StyledBigCardTitle>
                        <TitleIcon />
                        <h3>
                            {cardData.cardTitle} this is the id {cardID}
                        </h3>
                    </StyledBigCardTitle>
                    <Link to="/task">
                        <StyledCloseIcon />
                    </Link>
                </StyledBigCardHeader>
                <StyledBigCardContent>
                    <StyledBigCardTitle>
                        <NotesIcon />
                        <h3>Description</h3>
                    </StyledBigCardTitle>
                    {clicked ? (
                        <TextArea
                            placeholder="enter the task description "
                            onChange={() => {
                                setChanged(!changed);
                            }}
                            onClick={() => {
                                setClicked(!clicked);
                            }}
                            $heightRem={14}
                            $widthPer={100}
                            value={cardData?.cardDescription}
                        />
                    ) : (
                        //todo make text area editable 
                        <TextArea
                            placeholder="enter the task description "
                            onChange={() => {
                                setChanged(!true);
                            }}
                            onClick={() => {
                                setClicked(!clicked);
                            }}
                            $heightRem={10}
                            $widthPer={100}
                            value={cardData?.cardDescription}
                            
                        />
                    )}
                </StyledBigCardContent>
                <StyledBigCardContent>
                    <StyledBigCardTitle>
                        <NotesIcon />
                        <h3>Activity</h3>
                    </StyledBigCardTitle>
                    <TextArea />
                </StyledBigCardContent>
            </StyledBigCard>
        );
};

export default BigCard;
