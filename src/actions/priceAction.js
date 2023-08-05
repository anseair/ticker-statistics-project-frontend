import {baseUrl, baseUrl8080} from "../utils/constants";
import {putPrice, pendingPrices} from "../slices/priceSlice";

export const fetchPrice = () => {
    return async (dispatch) => {
        dispatch(pendingPrices('Pending'));
        const response = await fetch(`${baseUrl8080}/financials/lastPrices`);
        const data = await response.json();
        const res = data;
        dispatch(putPrice(res));
        dispatch(pendingPrices('Done'))
        localStorage.setItem('pricesAll', JSON.stringify(res));
    }
}
