import {createSlice} from "@reduxjs/toolkit";

const tickersSlice = createSlice({
    name: 'ticker',
    initialState: {
        tickers: [],
        description: []
    },
    reducers: {
        putTickers(state, action) {
            state.tickers = action.payload
        },
        putDescription(state, action) {
            state.description = action.payload
        },
        deleteTicker: (state, action) => {
            let deletedId = action.payload;
            state.selectedTickers = state.selectedTickers.filter(
                (item) => deletedId !== item
            );
        }
    }
})
export  const {putTickers, deleteTicker, putDescription} = tickersSlice.actions;
export default tickersSlice.reducer;