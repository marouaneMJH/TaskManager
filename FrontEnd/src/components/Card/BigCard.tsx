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

const StyledBigCard = styled.div<{ visible?: boolean }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${({ visible }) => (visible ? "none" : "flex")};
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
const StyledDescription = styled.div`
    background-color: #444;
    max-height: 14rem;
    width: 95%;
    border-radius: 6px;
    padding: 1rem;
    overflow-y: scroll;
    /* line-height: 1.6rem;
    line-break: normal; */
`;
const BigCard: React.FC<ICard> = ({ cardID, cardTitle }) => {


    const [clicked, setClicked] = useState<boolean>(false);
    const [iconClick, setIconClick] = useState<boolean>(false);
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
                    await axios.post(`http://localhost:3000/task/${cardID}`, {cardDescription: cardData.cardDescription});
            } catch (error) {
                console.error("Failed to post card description", error);
            }
        };

        fetchCardData();
        postCardDescription();
    }, [changed]);

    console.log(changed);
    return (
        <StyledBigCard visible={iconClick}>
            <StyledBigCardHeader>
                <StyledBigCardTitle>
                    <TitleIcon />
                    <h3>
                        {cardTitle} this is the id {cardID}
                    </h3>
                </StyledBigCardTitle>
                <StyledCloseIcon
                    onClick={() => {
                        setIconClick(true);
                    }}
                />
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
                            setChanged(true);
                        }}
                        $heightRem={14}
                        $widthPer={100}
                    >
                        {cardData != undefined ? (
                            cardData?.cardDescription
                        ) : (
                            <>Error</>
                        )}
                    </TextArea>
                ) : (
                    //todo when i do div it works but with text area wont work
                    <StyledDescription
                        // $heightRem={14}
                        onClick={() => setClicked(!clicked)}
                    >
                        {cardData?.cardDescription}
                    </StyledDescription>
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
