import {baseUrl} from "../utils/constants";
import {errorMaxMinPrice, putMaxPrice, putMinPrice} from "../slices/maxAndMinPriceSlice";

export const fetchMaxPrice = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/max`, {
                method: "Post",
                body: JSON.stringify({
                    names: ticker,
                    dateBetween: {
                        dateFrom: dateFrom,
                        dateTo: dateTo
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Credentials' : 'true',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
                    // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                },
            mode: "no-cors"
            }
        )
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putMaxPrice(price)))
            .catch(e => dispatch(errorMaxMinPrice()))
    }
}

export const fetchMinPrice = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/min`, {
            body: JSON.stringify({
                names: ticker,
                dateBetween: {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            }),
        })
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putMinPrice(price)))
            .catch(e => dispatch(errorMaxMinPrice()))
    }
}