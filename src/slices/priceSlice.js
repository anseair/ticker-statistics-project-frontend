import {createSlice} from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: "prices",
    initialState: {
        priceMainTicker: {},
        priceFirstTicker: {},
        priceSecondTicker: {},
        priceTickerForStatistic: {},
        priceTickerForStatisticInvestmentPortfolio: [],
        pricesAll: [],
        text: ''
    },
    reducers: {
        putPrice(state, action) {
            state.pricesAll = action.payload;
        },
        putPriceMainTicker(state, action) {
            state.priceMainTicker = action.payload;
        },
        putPriceFirstTicker(state, action) {
            state.priceFirstTicker = action.payload;
        },
        putPriceSecondTicker(state, action) {
            state.priceSecondTicker = action.payload;
        },
        putPriceTickerForStatistic(state, action) {
            state.priceTickerForStatistic = action.payload;
        },
        putPriceTickerForStatisticInvestmentPortfolio(state, action) {
            state.priceTickerForStatisticInvestmentPortfolio = action.payload;
        },
        errorPrice(state){
            state = 'Error';
        },
        pendingPrices(state, action) {
            state.text = action.payload;
        },
    }
})
export const {putPriceMainTicker,  putPriceFirstTicker, putPriceSecondTicker, putPriceTickerForStatistic,
    putPriceTickerForStatisticInvestmentPortfolio,
    putPrice, errorPrice, pendingPrices } = priceSlice.actions;
export default priceSlice.reducer;