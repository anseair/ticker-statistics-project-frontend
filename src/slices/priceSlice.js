import {createSlice} from "@reduxjs/toolkit";

export const priceSlice = createSlice({
    name: "price",
    initialState: {
    },
    reducers: {
        putPrice(state, action) {
           state = action.payload;
        },
        errorPrice(state){
            state = 'Error';
        }
    }
})
export const {putPrice, errorPrice} = priceSlice.actions;
export default priceSlice.reducer;