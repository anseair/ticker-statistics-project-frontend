import {createSlice} from "@reduxjs/toolkit";

export const statisticSlice = createSlice({
    name: "statistic",
    initialState: {
        statistic: {},
        statisticForInvestmentPortfolio: {}
    },
    reducers: {
        putStatistic(state, action){
            return action.payload;
        },
        putStatisticForInvestmentPortfolio(state, action){
            return action.payload;
        },
    }
})
export const {putStatistic, putStatisticForInvestmentPortfolio, errorStatistic} = statisticSlice.actions;

export default statisticSlice.reducer;