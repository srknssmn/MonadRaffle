import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
    userPortfolio: [],
    userNfts: []
}

export const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        setAccount: (state, action) => {
            localStorage.setItem('wallet', JSON.stringify(action.payload));
            state.account = action.payload;
        },
        logout: (state, action) => {
            localStorage.clear();
            state.account = null;
        },
        setUserPortfolio: (state, action) => {
            state.userPortfolio = action.payload;
        },
        setUserNfts: (state, action) => {
            state.userNfts = action.payload;
        },
    }
})

export const {setAccount, logout, setUserPortfolio, setUserNfts} = accountsSlice.actions;
export default accountsSlice.reducer;