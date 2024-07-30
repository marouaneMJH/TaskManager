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

    ::-webkit-scrollbar {
        width: 12px; /* Width of the scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1; /* Background color of the track */
        border-radius: 10px; /* Rounded corners of the track */
    }

    ::-webkit-scrollbar-thumb {
        background: #888; /* Color of the draggable part of the scrollbar */
        border-radius: 10px; /* Rounded corners of the scrollbar thumb */
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555; /* Color of the scrollbar thumb on hover */
    }
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
    return (
        <StyledCardContainer>
            {cards.length > 0 ? (
                cards.map((title, index) => (
                    <Card key={index} title={title.cardtitle} />
                ))
            ) : (
                <Card title="something went wrong" />
            )}
            <AddCard />
        </StyledCardContainer>
    );
};

export default CardContainer;
