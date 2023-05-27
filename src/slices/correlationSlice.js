import {createSlice} from "@reduxjs/toolkit";

export const correlationSlice = createSlice({
    name: "correlation",
    initialState: {
        correlation: ''
    },
    reducers: {
        putCorrelation(state, action) {
            state.correlation = action.payload
        }
    }
})
export const {putCorrelation} = correlationSlice.actions;
export default correlationSlice.reducer;