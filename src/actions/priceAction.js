import {baseUrl} from "../utils/constants";
import {errorPrice, putPrice} from "../slices/priceSlice";
export const fetchLastPrice = () => {
    return async (dispatch) => {
       fetch(`${baseUrl}/financials/ticker/AAPL/2023-04-20`)
           .then(response => response.json())
           .then(data => data.priceClose)
           .then(price => dispatch(putPrice(price)))
           .catch(e => dispatch(errorPrice()))
    }
}