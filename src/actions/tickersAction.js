import {baseUrl, baseUrl8080, password, username} from "../utils/constants";
import {putTickers} from "../slices/tickersSlice";

export const fetchTickers = () => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl}/financials/tickers`);
        if (response.ok) {
            const data = await response.json();
            dispatch(putTickers(data))
        } else {
            throw new Error(response.status.toString())
        }
    }
}