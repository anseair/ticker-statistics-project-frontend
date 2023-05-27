import {createSlice} from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: "prices",
    initialState: {
        priceMainTicker: {},
        priceFirstTicker: {},
        priceSecondTicker: {},
        priceTickerForStatistic: {},
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
        errorPrice(state){
            state = 'Error';
        }
    }
})
export const {putPriceMainTicker,  putPriceFirstTicker, putPriceSecondTicker, putPriceTickerForStatistic,
    putPrice, errorPrice } = priceSlice.actions;
export default priceSlice.reducer;