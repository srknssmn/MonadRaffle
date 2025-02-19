import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    badge: null
}

export const badgeSlice = createSlice({
    name: "badge",
    initialState,
    reducers: {
        setBadge: (state, action) => {
            state.badge = action.payload;
        }
    }
})

export const {setBadge} = badgeSlice.actions;
export default badgeSlice.reducer;