import {createSlice} from "@reduxjs/toolkit";

const tickersSlice = createSlice({
    name: 'ticker',
    initialState: {
        tickers: []
    },
    reducers: {
        putTickers(state, action) {
            state.tickers = action.payload
        }
    }
})
export  const {putTickers} = tickersSlice.actions;
export default tickersSlice.reducer;