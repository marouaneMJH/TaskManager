import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskData from "./../../Interfaces/ITaskData";
import Comment from "./../../Interfaces/ICommnent";
import BigCard from "./BigCard";
import axios from "axios";

type ICardInformation = TaskData & Comment;

const StyledCard = styled.li`
    background-color: #0f1e0f;
    padding: 0.7rem;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
    outline: none;
    &:hover {
        background-color: #334d33;
        cursor: pointer;
    }
`;

const Card: React.FC<ICardInformation> = ({ id, title }) => {
    const [click, setClick] = useState<boolean>(false);
    const [cardInfos, setCardInfos] = useState<ICardInformation>({});

    //fetch card information


    useEffect(() => {
        const cardInformation = async () => {
            try {
                const result = await axios.get(`http://localhost:3000/task/${id}`);
                setCardInfos(result.data);
            } catch {
                setCardInfos("");
            }
        };

        cardInformation();
    }, []);
    return (
        <StyledCard   onClick={() => setClick(true)}>
            {title}

            {click && <BigCard title={title} id={id} />}
        </StyledCard>
    );
};

export default Card;
