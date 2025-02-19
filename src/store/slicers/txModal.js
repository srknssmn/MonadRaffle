import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    txModal: false,
}

export const txModalSlice = createSlice({
    name: "txModal",
    initialState,
    reducers: {
        setTxModal: (state, action) => {
            state.txModal = action.payload;
        },
    }
})

export const {setTxModal} = txModalSlice.actions;
export default txModalSlice.reducer;