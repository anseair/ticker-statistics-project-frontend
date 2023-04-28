import {configureStore} from "@reduxjs/toolkit";
import tickers from "../slices/tickersSlice";
import prices from "../slices/priceSlice";
import maxMinPrice from "../slices/maxAndMinPriceSlice";


export const store = configureStore({
    reducer: {
        tickers, prices, maxMinPrice
    }
})