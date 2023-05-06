import {createSlice} from "@reduxjs/toolkit";

export const maxAndMinPriceSlice = createSlice({
    name: 'maxMinPrice',
    initialState: {
        minMaxPricesMainTicker: [],
        maxPrice: [],
        minPrice: []
    },
    reducers: {
        putMaxPriceMainTicker(state, action) {
            state.minMaxPricesMainTicker[0] = action.payload.toFixed(2)
        },
        putMinPriceMainTicker(state, action) {
            state.minMaxPricesMainTicker[1] = action.payload.toFixed(2)
        },
        putMaxPriceFirstTicker(state, action) {
            state.maxPrice[0] = action.payload.toFixed(2)
        },
        putMinPriceFirstTicker(state, action) {
            state.minPrice[0] = action.payload.toFixed(2)
        },
        putMaxPriceSecondTicker(state, action) {
            state.maxPrice[1] = action.payload.toFixed(2)
        },
        putMinPriceSecondTicker(state, action) {
            state.minPrice[1] = action.payload.toFixed(2)
        },
        errorMaxMinPrice(state){
            state = 'Error'
        }
    }
})

export  const {errorMaxMinPrice, putMaxPriceMainTicker, putMinPriceMainTicker, putMaxPriceFirstTicker, putMinPriceFirstTicker, putMaxPriceSecondTicker, putMinPriceSecondTicker} = maxAndMinPriceSlice.actions;

export  default maxAndMinPriceSlice.reducer;