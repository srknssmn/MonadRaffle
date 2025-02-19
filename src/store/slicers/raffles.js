import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    raffles: [],
    latestLiveRaffles: [],
    currentRaffle: null,
    currentRaffleSituation: false
}

export const rafflesSlice = createSlice({
    name: "raffles",
    initialState,
    reducers: {
        setRaffles: (state, action) => {
            state.raffles = action.payload;
        },
        setLatestLiveRaffles: (state, action) => {
            state.latestLiveRaffles = action.payload;
        },
        setRaffle: (state, action) => {
            state.currentRaffle = action.payload;
        },
        setRaffleSituation: (state, action) => {
            state.currentRaffleSituation = action.payload;
        }
    }
})

export const {setRaffles, setLatestLiveRaffles, setRaffle, setRaffleSituation} = rafflesSlice.actions;
export default rafflesSlice.reducer;