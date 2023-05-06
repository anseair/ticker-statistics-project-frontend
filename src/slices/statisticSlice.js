import {createSlice} from "@reduxjs/toolkit";

export const statisticSlice = createSlice({
    name: "statistic",
    initialState: {},
    reducers: {
        putStatistic(state, action){
            return action.payload;
        }
    }
})
export const {putStatistic, errorStatistic} = statisticSlice.actions;

export default statisticSlice.reducer;