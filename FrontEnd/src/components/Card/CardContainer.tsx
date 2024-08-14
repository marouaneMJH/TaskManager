import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import AddCard from "./AddCard";

import TaskData from "../../Interfaces/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

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
    const isReload = useSelector(
        (state: RootState) => state.reloadCardContainer
    );
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
    }, [isReload]);
    return (
        <StyledCardContainer>
            {cards.length > 0 ? (
                cards.map((card, index) => (
                    <Link key={index} to={`${card.cardID}`}>
                        <Card key={card.cardID} cardTitle={card.cardTitle} />
                    </Link>
                ))
            ) : (
                <Card cardTitle="Something went wrong" />
            )}
            <AddCard listID={listID} />
        </StyledCardContainer>
    );
};

export default CardContainer;
