import {baseUrl, baseUrl8080} from "../utils/constants";
import {putDescription, putTickers} from "../slices/tickersSlice";

export const fetchTickers = () => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl}/financials/tickers`);
        if (response.ok) {
            const data = await response.json();
            dispatch(putTickers(data));
        } else {
            throw new Error(response.status.toString())
        }
    }
}

export const fetchDescription = () => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl8080}/financials/descriptions`,{
            headers: {
                    'Content-Type': 'application/json',
                },
            method: 'Get',
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(putDescription(data))
            localStorage.setItem('descriptionsAll', JSON.stringify(data));
        } else {
            throw new Error(response.status.toString())
        }
    }
}