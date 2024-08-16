import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/ui/Header";
import { IoMdPerson } from "react-icons/io";
import { Button } from "../components/ui/button";

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const StyledCard = styled(Link)`
    position: relative;
    min-width: 250px;
    padding: 1rem;
    color: white;

    border: #fff 1px solid;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    font-size: 14px;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    &:hover:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #acabb0;
        background-image: linear-gradient(
            40deg,
            #ecdfcc 0%,
            #3795bd 25%,
            #4e31aa 50%,
            #3a1078 75%
        );
        filter: blur(10px);
        z-index: -1;
    }

    @media (max-width: 900px) {
        min-width: 200px;
        font-size: 12px;
    }

    @media (max-width: 600px) {
        min-width: 100%;
        font-size: 10px;
    }
`;

const StyledHome = styled(Button)`
    position: fixed;
    bottom: 2rem;
    right: 2px;
`;

const StyledTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`;

const StyledBodyContainer = styled.main`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem;
    color: aliceblue;
    /* padding: 1rem; */
`;

//todo make background styled by the backend
const Boards: React.FC = () => {
    const [boards, setBoards] = useState<string[]>([
        "Project Planning",
        "Design Ideas",
        "Development Tasks",
        "QA Testing",
        "Marketing Strategy",
        "Bug Tracking",
        "Client Feedback",
        "Product Launch",
    ]);

    //fetching the boards title
    useEffect(() => {
        const fetchBoardsTitle = async () => {
            //adding auth to user and all component
            try {
                const result = await axios.get("http://localhost:3000/boards");
                setBoards(result.data);
            } catch {
                console.error("error in fetching board");
            }
        };

        fetchBoardsTitle();
    });
    return (
        <>
            <Header title={"dashBoard"} />
            <StyledBodyContainer>
                <StyledTitleContainer>
                    <IoMdPerson fontSize={25} />
                    <h2>Your boards</h2>
                </StyledTitleContainer>
                <StyledContainer>
                    {boards.length > 0 ? (
                        boards.map((el, index) => (
                            <StyledCard to="/task" key={index}>
                                <h3
                                    style={{
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    {el}
                                </h3>
                            </StyledCard>
                        ))
                    ) : (
                        <>
                            <StyledCard to="/task">yo</StyledCard>
                            <h2>no boards to show</h2>
                        </>
                    )}
                    <StyledHome>
                        <Link to="/task">Home</Link>
                    </StyledHome>
                </StyledContainer>
            </StyledBodyContainer>
        </>
    );
};

export default Boards;
