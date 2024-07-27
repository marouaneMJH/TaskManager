import React from "react";
// import TasksContainer from "./components/TasksMangement/TasksContainer";
// import ColumnsContainer from './components/dashboard/ColumnsContainer'
import ListContainer from "./components/List/ListContainer";


const App: React.FC = () => {
    return <div style={{
        width: '100vw',
    }}>
        {/* <TasksContainer /> */}
        {/* <ColumnsContainer title="Dashboard" /> */}
        <ListContainer />
    </div>;
};

export default App;
