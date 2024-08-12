import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import AddList from "./AddList";
import List from "./List";

import IList from "./../../Interfaces/List";
const StyledListContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* background-color: #f17575; */
    align-items: start;
    width: 100vw;
    padding: 1rem;
    overflow-x: auto;
    gap: 20px;
`;

const ListContainer: React.FC = () => {
    const [lists, setLists] = useState<IList[]>([]);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const result = await axios.get("http://localhost:3000/lists");
                setLists(result.data);
            } catch {
                setLists([]); // Reset the state to an empty array on error
            }
        };

        fetchLists();
    }, []);

    return (
        <StyledListContainer>
            {lists.length > 0 ? (
                lists.map((el, index) => (
                    <List key={index} title={el.listName} listID={el.listID} />
                ))
            ) : (
                <h1>No items to show</h1>
            )}
            <AddList />
        </StyledListContainer>
    );
};

export default ListContainer;
