import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import BigCard from "./components/Card/BigCard.tsx";

const router = createBrowserRouter([
    {
        path: "/task",
        element: <App />,
        children: [
            {
                path: ":ID",
                element: <BigCard />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
