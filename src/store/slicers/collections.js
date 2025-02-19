import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collections: [],
    currentCollectionRaffles: []
}

export const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
        setCollectionRaffles: (state, action) => {
            state.currentCollectionRaffles = action.payload;
        }
    }
})

export const {setCollections, setCollectionRaffles} = collectionsSlice.actions;
export default collectionsSlice.reducer;