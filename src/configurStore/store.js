import {configureStore} from "@reduxjs/toolkit";
import tickers from "../slices/tickersSlice";
import prices from "../slices/priceSlice";
import minMaxPrice from "../slices/minMaxPriceSlice";
import correlation from "../slices/correlationSlice";
import statisticInfo from "../slices/statisticSlice";

export const store = configureStore({
    reducer: {
        tickers, prices, minMaxPrice, correlation, statisticInfo
    }
})