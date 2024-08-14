import { configureStore } from "@reduxjs/toolkit";
import {
    reloadCardContainerReducer,
    reloadListContainerReducer,
} from "./Reload/pageReload";

export const store = configureStore({
    reducer: {
        reloadCardContainer: reloadCardContainerReducer,
        reloadListContainer: reloadListContainerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
