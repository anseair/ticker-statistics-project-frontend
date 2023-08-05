import {createSlice} from "@reduxjs/toolkit";

export const correlationSlice = createSlice({
    name: "correlation",
    initialState: {
        correlation: '',
        textCorrelation: '',
        errorCorrelation: ''
    },
    reducers: {
        putCorrelation(state, action) {
            state.correlation = action.payload
        },
        pendingCorrelation(state, action) {
            state.textCorrelation = action.payload;
        },
        errorCorrelation(state, action) {
            state.errorCorrelation = action.payload
        }
    }
})
export const {putCorrelation, pendingCorrelation, errorCorrelation} = correlationSlice.actions;
export default correlationSlice.reducer;