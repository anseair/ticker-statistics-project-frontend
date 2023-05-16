import {createSlice} from "@reduxjs/toolkit";

export const allPricesSlice = createSlice({
    name: "allPrices",
    initialState: {},
    reducers: {
        putAllPrices (state, action) {
            return action.payload
        }
    }
})
export const {putAllPrices} = allPricesSlice.actions;
export  default allPricesSlice.reducer;