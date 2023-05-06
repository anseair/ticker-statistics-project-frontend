import {createSlice} from "@reduxjs/toolkit";

export const correlationSlice = createSlice({
    name: "correlation",
    initialState: {
        text: ''
    },
    reducers: {
        putCorrelation(state, action) {
            state.text = action.payload
        }
    }
})
export const {putCorrelation} = correlationSlice.actions;
export default correlationSlice.reducer;