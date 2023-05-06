import {createSlice} from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: "price",
    initialState: {
        pricesMainTicker: [],
        pricesFirstTicker: [],
        pricesSecondTicker: [],

        prices: [],
        beforePrices: [],
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
            state.prices.push(action.payload.toFixed(2))
        },
        putBeforePrice(state, action) {
            state.beforePrices.push(action.payload.toFixed(2))
        },

        putPriceAAPL(state, action) {
            state.prices[0]= action.payload.toFixed(2)
        },
        putPriceAMZN(state, action) {
            state.prices[1]= action.payload.toFixed(2)
        },
        putPriceMSFT(state, action) {
            state.prices[2]= action.payload.toFixed(2)
        },
        putPriceTSLA(state, action) {
            state.prices[3]= action.payload.toFixed(2)
        },
        putPriceGSPC(state, action) {
            state.prices[4]= action.payload.toFixed(2)
        },

        putBeforePriceAAPL(state, action) {
            state.beforePrices[0]= action.payload.toFixed(2)
        },
        putBeforePriceAMZN(state, action) {
            state.beforePrices[1]= action.payload.toFixed(2)
        },
        putBeforePriceMSFT(state, action) {
            state.beforePrices[2]= action.payload.toFixed(2)
        },
        putBeforePriceTSLA(state, action) {
            state.beforePrices[3]= action.payload.toFixed(2)
        },
        putBeforePriceGSPC(state, action) {
            state.beforePrices[4]= action.payload.toFixed(2)
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