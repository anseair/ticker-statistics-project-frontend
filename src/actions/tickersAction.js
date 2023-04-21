import {baseUrl} from "../utils/constants";
import {putTickers} from "../slices/tickersSlice";

export const fetchTickers = () => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl}/financials/tickers`);
        if (response.ok) {
            const data = await response.json();
            // const tickers = data.map(ticker => ticker);
            dispatch(putTickers(data))
        }
        throw new Error(response.status.toString())
    }
}