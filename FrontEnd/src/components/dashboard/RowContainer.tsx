import React from "react";
import Row from "./Row";

const RowContainer: React.FC = () => {
    return (
        <tbody>
            {/* mapping the rows */}
            <Row title="name of me 1"/>
            <Row title="name of me 2"/>
            <Row title="name of me 3"/>
            <Row title="name of me 4"/>
        </tbody>
    );
};

export default RowContainer;
