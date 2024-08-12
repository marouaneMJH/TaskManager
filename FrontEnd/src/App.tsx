import React from "react";
import { Outlet } from "react-router-dom";
// import ListContainer from "./components/List/ListContainer";
import Header from "./components/UI/Header";
import TasksPage from "./pages/TasksPage";

const App: React.FC = () => {
    return (
        <div
            style={{
                width: "100vw",
            }}
        >
            <Header title="MJH" />
            <TasksPage />
            <Outlet />
        </div>
    );
};

export default App;
