import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.tsx";
import "./index.css";
import BigCard from "./components/Card/BigCard.tsx";
import DashBoard from "./pages/DashBoards.tsx";
import Auth from "./pages/Auth.tsx";
import { store } from "./state/store.ts";
import SignIn from "./components/Acount/SignIn.tsx";
import SignUp from "./components/Acount/SignUp.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth/sign-in" replace />,
    },
    {
        path: "/auth",
        element: <Auth/>,
        children: [
            {
                path: "sign-in",
                element: <SignIn/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            },
            
        ]
    },
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
    {
        path: "dash-board",
        element: <DashBoard />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
