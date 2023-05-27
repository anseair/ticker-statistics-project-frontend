import {createSlice} from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: "prices",
    initialState: {
        priceMainTicker: {},
        priceFirstTicker: {},
        priceSecondTicker: {},
        priceTickerForStatistic: {},
        priceTickerForStatisticInvestmentPortfolio: [],
        pricesAll: []
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
        }
    }
})
export const {putPriceMainTicker,  putPriceFirstTicker, putPriceSecondTicker, putPriceTickerForStatistic,
    putPriceTickerForStatisticInvestmentPortfolio,
    putPrice, errorPrice } = priceSlice.actions;
export default priceSlice.reducer;