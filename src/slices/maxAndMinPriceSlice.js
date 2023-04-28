import {createSlice} from "@reduxjs/toolkit";

export const maxAndMinPriceSlice = createSlice({
    name: 'maxAndMinPrice',
    initialState: {
        maxPrice: '',
        minPrice: ''
    },
    reducers: {
        putMaxPrice(state, action) {
            state.maxPrice = action.payload
        },
        putMinPrice(state, action) {
            state.minPrice = action.payload
        },
        errorMaxMinPrice(state){
            state = 'Error'
        }
    }
})

export  const {errorMaxMinPrice, putMaxPrice, putMinPrice} = maxAndMinPriceSlice.actions;

export  default maxAndMinPriceSlice.reducer;