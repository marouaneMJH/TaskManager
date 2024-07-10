import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Task from "./Task";
import AddTask from "./AddTask";
import TaskData from "./../../Interfaces/ITaskData";
import PopUp from "./PopUp";
import styled from "styled-components";



const StyledTask= styled.div`
        width: 30%;
        height: 100dvh;
        transition: all 0.3s ease-in-out;
        transform: -50% -50%;
        text-align: center;
`




const Tasks: React.FC<{ title: string;background:string }> = ({ title, background }) => {
    const [taskData, setTaskData] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async (): Promise<void> => {
            try {
                const taskOneRes: AxiosResponse = await axios.get(
                    "http://localhost:3000/task1"
                );
                const taskOneResData = taskOneRes.data;
                if (isMounted) {
                    setTaskData(taskOneResData);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setError("Error fetching tasks. Please try again later.");
                setShowErrorPopup(true);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);// todo fetching data when somme thing add task(post request)

    return (
        <>
            <StyledTask
                
                className="tasks-container"
                style={{
                    background: background,
                    opacity: loading ? 0 : 1,
                    transform: loading ? "translateY(-1rem)" : "translateY(0)",
                    transition: "opacity 0.5s, transform 0.5s",
                }}
            >
                <h1>{title}</h1>
                {loading ? (
                    <h3>Loading...</h3>
                ) : error ? (
                    <h3>{error}</h3>
                ) : taskData.length > 0 ? (
                    taskData.map((task: TaskData) => (
                        <Task key={task.id} props={task} />
                    ))
                ) : (
                    <h3>No items to show</h3>
                )}
                <AddTask />
                {showErrorPopup && <PopUp message={"something went wrong"} />}
            </StyledTask>
        </>
    );
};

export default Tasks;
