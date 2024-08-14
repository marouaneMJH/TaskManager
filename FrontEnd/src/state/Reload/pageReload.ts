import { createSlice } from "@reduxjs/toolkit";

interface ContainerReload {
    isReload: boolean;
}

const initialCardContainerReload: ContainerReload = { isReload: false };

const initialListContainerReload: ContainerReload = { isReload: false };

const reloadCardContainerSlice = createSlice({
    name: "reloadCardContainer",
    initialState: initialCardContainerReload,
    reducers: {
        toggleCardState: (state) => {
            state.isReload = !state.isReload;
        },
    },
});

const reloadListContainerSlice = createSlice({
    name: "reloadListContainer",
    initialState: initialListContainerReload,
    reducers: {
        toggleListState: (state) => {
            state.isReload = !state.isReload;
        },
    },
});

export const reloadCardContainerReducer = reloadCardContainerSlice.reducer;
export const reloadListContainerReducer = reloadListContainerSlice.reducer;
export const { toggleCardState } = reloadCardContainerSlice.actions;
export const { toggleListState } = reloadListContainerSlice.actions;
