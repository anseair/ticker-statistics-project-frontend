import {baseUrl} from "../utils/constants";
import {errorPrice, putPrice} from "../slices/priceSlice";

const priceTicker = actionFunc => (...args) => actionFunc(...args);
const fetch = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPrice(price)))
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchPrice = priceTicker(fetch);
