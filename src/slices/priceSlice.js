import {createSlice} from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: "price",
    initialState: {
        prices: [],
        priceTicker: ''
    },
    reducers: {
        putPrice(state, action) {
            state.priceTicker = action.payload
        },
        putPriceAAPL(state, action) {
           state.prices[0]= action.payload;
        },
        putPriceAMZN(state, action) {
            state.prices[1]= action.payload;
        },
        putPriceGOOG(state, action) {
            state.prices[2]= action.payload;
        },
        putPriceINTC(state, action) {
            state.prices[3]= action.payload;
        },
        putPriceMSFT(state, action) {
            state.prices[4]= action.payload;
        },
        putPriceTSLA(state, action) {
            state.prices[5]= action.payload;
        },
        putPriceGSPC(state, action) {
            state.prices[6]= action.payload;
        },
        errorPrice(state){
            state = 'Error';
        }
    }
})
export const {putPrice, putPriceAAPL, putPriceAMZN, putPriceINTC, putPriceGOOG, putPriceMSFT, putPriceTSLA, putPriceGSPC, errorPrice} = priceSlice.actions;
export default priceSlice.reducer;