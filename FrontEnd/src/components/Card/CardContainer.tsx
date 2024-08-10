import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import AddCard from "./AddCard";

import TaskData from "../../Interfaces/Card";

const StyledCardContainer = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0.08rem;
    background-color: #1e361e;
    list-style: none;
    gap: 0.3rem;
    border-radius: 20px;
    max-height: 70vh;
    overflow-y: auto;
`;

const CardContainer: React.FC<{ listID: number }> = ({ listID }) => {
    const [cards, setCards] = useState<TaskData[]>([]);
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:3000/cards/${listID}`
                );
                setCards(result.data);
            } catch {
                setCards([]); // Reset the state to an empty array on error
            }
        };

        fetchLists();
    }, []);
    return (
        <StyledCardContainer>
            {cards.length > 0 ? (
                cards.map((card) => (
                    <Card
                        key={card.cardID}
                        cardTitle={card.cardTitle}
                        cardID={card.cardID}
                    />
                ))
            ) : (
                <Card cardTitle="Something went wrong" />
            )}
            <AddCard />
        </StyledCardContainer>
    );
};

export default CardContainer;
