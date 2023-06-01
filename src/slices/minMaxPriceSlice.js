import {createSlice} from "@reduxjs/toolkit";

export const minMaxPriceSlice = createSlice({
    name: 'minMaxPrice',
    initialState: {
        minMaxPricesMainTicker: {},
        minMaxPricesFirstTicker: {},
        minMaxPricesSecondTicker: {},
        minMaxPricesMainTickerForPeriod: {}
    },
    reducers: {
        putMinMaxPricesMainTicker(state, action) {
            state.minMaxPricesMainTicker = action.payload
        },
        putMinMaxPricesFirstTicker(state, action) {
            state.minMaxPricesFirstTicker = action.payload
        },
        putMinMaxPricesSecondTicker(state, action) {
            state.minMaxPricesSecondTicker = action.payload
        },
        errorMinMaxPrice(state){
            state = 'Error'
        },
        putMinMaxPricesMainTickerForPeriod(state, action) {
            state.minMaxPricesMainTickerForPeriod = action.payload
        }
    }
})

export  const {errorMinMaxPrice,putMinMaxPricesMainTicker,
    putMinMaxPricesFirstTicker, putMinMaxPricesSecondTicker, putMinMaxPricesMainTickerForPeriod} = minMaxPriceSlice.actions;

export  default minMaxPriceSlice.reducer;