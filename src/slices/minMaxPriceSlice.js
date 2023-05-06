import {createSlice} from "@reduxjs/toolkit";

export const minMaxPriceSlice = createSlice({
    name: 'minMaxPrice',
    initialState: {
        minMaxPricesMainTicker: [],
        minMaxPriceFirstTicker: [],
        minMaxPriceSecondTicker: []
    },
    reducers: {
        putMinPriceMainTicker(state, action) {
            state.minMaxPricesMainTicker[0] = action.payload.toFixed(2)
        },
        putMaxPriceMainTicker(state, action) {
            state.minMaxPricesMainTicker[1] = action.payload.toFixed(2)
        },
        putMinPriceFirstTicker(state, action) {
            state.minMaxPriceFirstTicker[0] = action.payload.toFixed(2)
        },
        putMaxPriceFirstTicker(state, action) {
            state.minMaxPriceFirstTicker[1] = action.payload.toFixed(2)
        },
        putMinPriceSecondTicker(state, action) {
            state.minMaxPriceSecondTicker[0] = action.payload.toFixed(2)
        },
        putMaxPriceSecondTicker(state, action) {
            state.minMaxPriceSecondTicker[1] = action.payload.toFixed(2)
        },
        errorMinMaxPrice(state){
            state = 'Error'
        }
    }
})

export  const {errorMinMaxPrice, putMaxPriceMainTicker, putMinPriceMainTicker, putMaxPriceFirstTicker, putMinPriceFirstTicker, putMaxPriceSecondTicker, putMinPriceSecondTicker} = minMaxPriceSlice.actions;

export  default minMaxPriceSlice.reducer;