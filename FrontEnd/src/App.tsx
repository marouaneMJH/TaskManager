import React from "react";
// import TasksContainer from "./components/TasksMangement/TasksContainer";
import ColumnsContainer from './components/dashboard/ColumnsContainer'

const App: React.FC = () => {
    return <div style={{
        width: '100vw',
    }}>
        {/* <TasksContainer /> */}
        <ColumnsContainer title="Dashboard" />
    </div>;
};

export default App;
