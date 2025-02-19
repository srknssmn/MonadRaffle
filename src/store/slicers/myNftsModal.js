import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myNftsModal: false,
}

export const myNftsModalSlice = createSlice({
    name: "myNftsModal",
    initialState,
    reducers: {
        setMyNftsModal: (state, action) => {
            state.myNftsModal = action.payload;
        },
    }
})

export const {setMyNftsModal} = myNftsModalSlice.actions;
export default myNftsModalSlice.reducer;