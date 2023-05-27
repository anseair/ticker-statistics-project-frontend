import {createSlice} from "@reduxjs/toolkit";

export const minMaxPriceSlice = createSlice({
    name: 'minMaxPrice',
    initialState: {
        minMaxPricesMainTicker: {},
        minMaxPricesFirstTicker: {},
        minMaxPricesSecondTicker: {}
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
        }
    }
})

export  const {errorMinMaxPrice,putMinMaxPricesMainTicker,
    putMinMaxPricesFirstTicker, putMinMaxPricesSecondTicker} = minMaxPriceSlice.actions;

export  default minMaxPriceSlice.reducer;