import React from "react";
import Title from "../../Interfaces/ITitle";

const Row: React.FC<Title> = ({title}) => {
    return <tr>
        <td>{title}</td>
    </tr>
};

export default Row;
