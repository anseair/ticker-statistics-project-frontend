import {createSlice} from "@reduxjs/toolkit";

export const allPricesForDiagramSlice = createSlice({
    name: "allPrices",
    initialState: {
        allPricesMainTicker: [],
        allPricesFirstTicker: [],
        allPricesSecondTicker: []
    },
    reducers: {
        putAllPricesMainTicker (state, action) {
            state.allPricesMainTicker = action.payload
        },
        putAllPricesFirstTicker (state, action) {
            state.allPricesFirstTicker = action.payload
        },
        putAllPricesSecondTicker (state, action) {
            state.allPricesSecondTicker = action.payload
        },

    }
})
export const {putAllPricesMainTicker, putAllPricesFirstTicker, putAllPricesSecondTicker} = allPricesForDiagramSlice.actions;
export  default allPricesForDiagramSlice.reducer;