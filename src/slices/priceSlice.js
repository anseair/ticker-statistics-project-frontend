import {createSlice} from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: "price",
    initialState: {
        pricesMainTicker: [],
        pricesFirstTicker: [],
        pricesSecondTicker: [],

        pricesAllTickers: [],
        beforePricesAllTickers: [],
    },
    reducers: {
        putPriceMainTicker(state, action) {
            state.pricesMainTicker.splice(0,1, action.payload.toFixed(2));
        },
        putBeforePriceMainTicker(state, action) {
            state.pricesMainTicker.splice(1, 1, action.payload.toFixed(2));
        },
        putPriceFirstTicker(state, action) {
            state.pricesFirstTicker.splice(0,1, action.payload.toFixed(2));
        },
        putBeforePriceFirstTicker(state, action) {
            state.pricesFirstTicker.splice(1,1, action.payload.toFixed(2));
        },
        putPriceSecondTicker(state, action) {
            state.pricesSecondTicker.splice(0,1, action.payload.toFixed(2));
        },
        putBeforePriceSecondTicker(state, action) {
            state.pricesSecondTicker.splice(1,1, action.payload.toFixed(2));
        },

        putPrice(state, action) {
            state.pricesAllTickers.push(action.payload.toFixed(2))
        },
        putBeforePrice(state, action) {
            state.beforePricesAllTickers.push(action.payload.toFixed(2))
        },

        putPriceAAPL(state, action) {
            state.pricesAllTickers[0]= action.payload.toFixed(2)
        },
        putPriceAMZN(state, action) {
            state.pricesAllTickers[1]= action.payload.toFixed(2)
        },
        putPriceMSFT(state, action) {
            state.pricesAllTickers[2]= action.payload.toFixed(2)
        },
        putPriceTSLA(state, action) {
            state.pricesAllTickers[3]= action.payload.toFixed(2)
        },
        putPriceGSPC(state, action) {
            state.pricesAllTickers[4]= action.payload.toFixed(2)
        },

        putBeforePriceAAPL(state, action) {
            state.beforePricesAllTickers[0]= action.payload.toFixed(2)
        },
        putBeforePriceAMZN(state, action) {
            state.beforePricesAllTickers[1]= action.payload.toFixed(2)
        },
        putBeforePriceMSFT(state, action) {
            state.beforePricesAllTickers[2]= action.payload.toFixed(2)
        },
        putBeforePriceTSLA(state, action) {
            state.beforePricesAllTickers[3]= action.payload.toFixed(2)
        },
        putBeforePriceGSPC(state, action) {
            state.beforePricesAllTickers[4]= action.payload.toFixed(2)
        },
        errorPrice(state){
            state = 'Error';
        }
    }
})
export const {putPriceMainTicker,  putPriceFirstTicker, putPriceSecondTicker,
    putBeforePriceMainTicker, putBeforePriceFirstTicker, putBeforePriceSecondTicker,
    putPrice, putPriceAAPL, putPriceAMZN, putPriceMSFT, putPriceTSLA, putPriceGSPC,
    putBeforePrice, putBeforePriceAAPL, putBeforePriceAMZN, putBeforePriceMSFT, putBeforePriceTSLA, putBeforePriceGSPC, errorPrice } = priceSlice.actions;
export default priceSlice.reducer;