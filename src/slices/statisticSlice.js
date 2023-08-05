import {createSlice} from "@reduxjs/toolkit";

export const statisticSlice = createSlice({
    name: "statistic",
    initialState: {
        statistic: {},
        statisticForInvestmentPortfolio: {},
        textStatistic: '',
        textStatisticForInvestmentPortfolio: '',
        errorStatistic: '',
        errorStatisticForInvestmentPortfolio: ''
    },
    reducers: {
        putStatistic(state, action){
            state.statistic = action.payload;
        },
        putStatisticForInvestmentPortfolio(state, action){
            state.statisticForInvestmentPortfolio = action.payload;
        },
        pendingStatistic(state, action) {
            state.textStatistic = action.payload;
        },
        pendingStatisticForInvestmentPortfolio(state, action) {
            state.textStatisticForInvestmentPortfolio = action.payload;
        },
        errorStatistic(state, action) {
            state.errorStatistic = action.payload
        },
        errorStatisticForInvestmentPortfolio(state, action) {
            state.errorStatisticForInvestmentPortfolio = action.payload
        }
    }
})
export const {putStatistic, putStatisticForInvestmentPortfolio,
    pendingStatistic, pendingStatisticForInvestmentPortfolio,
    errorStatistic, errorStatisticForInvestmentPortfolio
} = statisticSlice.actions;

export default statisticSlice.reducer;