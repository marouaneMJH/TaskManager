import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import AddCard from "./AddCard";

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
    const [cards, setCards] = useState<string[]>([]);
    // console.log("---",typeof listID);
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:3000/cards/${listID}`
                );
                console.log(result.data);
                setCards(result.data);
            } catch {
                setCards([]); // Reset the state to an empty array on error
            }
        };

        fetchLists();
    }, []);
    console.log(cards);
    return (
        <StyledCardContainer>
            {cards.length > 0 ? (
                cards.map((el, index) => (
                    <Card key={index} title={el.cardtitle} id={el.cardid} />
                ))
            ) : (
                <Card title="something went wrong" />
            )}
            <AddCard />
        </StyledCardContainer>
    );
};

export default CardContainer;
