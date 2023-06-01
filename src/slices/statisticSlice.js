import {createSlice} from "@reduxjs/toolkit";

export const statisticSlice = createSlice({
    name: "statistic",
    initialState: {
        statistic: {},
        statisticForInvestmentPortfolio: {}
    },
    reducers: {
        putStatistic(state, action){
            state.statistic = action.payload;
        },
        putStatisticForInvestmentPortfolio(state, action){
            state.statisticForInvestmentPortfolio = action.payload;
        },
    }
})
export const {putStatistic, putStatisticForInvestmentPortfolio, errorStatistic} = statisticSlice.actions;

export default statisticSlice.reducer;