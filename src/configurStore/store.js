import {configureStore} from "@reduxjs/toolkit";
import tickers from "../slices/tickersSlice";
import prices from "../slices/priceSlice";


export const store = configureStore({
    reducer: {
        tickers, prices
    }
})