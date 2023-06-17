import {createSlice} from "@reduxjs/toolkit";

const tickersSlice = createSlice({
    name: 'ticker',
    initialState: {
        tickers: [],
        selectedTickers: []
    },
    reducers: {
        putTickers(state, action) {
            state.tickers = action.payload
        },
        addTicker(state, action) {
            state.selectedTickers.push(action.payload);
        },
        deleteTicker: (state, action) => {
            let deletedId = action.payload;
            state.selectedTickers = state.selectedTickers.filter(
                (item) => deletedId !== item
            );
        }
    }
})
export  const {putTickers, addTicker, deleteTicker} = tickersSlice.actions;
export default tickersSlice.reducer;