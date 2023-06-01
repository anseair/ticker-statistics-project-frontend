import {baseUrl, baseUrl8080, dateStr} from "../utils/constants";
import {
    errorMinMaxPrice,
    putMinMaxPricesFirstTicker,
    putMinMaxPricesMainTicker, putMinMaxPricesMainTickerForPeriod,
    putMinMaxPricesSecondTicker
} from "../slices/minMaxPriceSlice";

export const fetchMinMaxPriceMainTickerForPeriod = (ticker, dateFrom, dateTo) => {

    return async (dispatch) => {
        fetch(`${baseUrl}/financials/minMax`, {
            method: 'Post',
            body: JSON.stringify(
                {
                    "names": [ticker],
                    "dateBetween": {
                        "dateFrom": dateFrom,
                        "dateTo": dateTo
                    }
                }
            ),
            headers: {
                'Content-Type': "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                const info = {
                    min: (data.min.priceClose).toFixed(2),
                    max: (data.max.priceClose).toFixed(2)
                }
                dispatch(putMinMaxPricesMainTickerForPeriod(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}

export const fetchMinMaxPriceMainTicker = (ticker) => {
    const count = 1000 * 60 * 60 * 24 * 365;
    const dateTo = new Date();
    const dateFrom = new Date(dateTo - count);
    const dateToStr = dateStr(dateTo);
    const dateFromStr = dateStr(dateFrom);
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/minMax`, {
            method: 'Post',
            body: JSON.stringify(
                {
                    "names": [ticker],
                    "dateBetween": {
                        "dateFrom": dateFromStr,
                        "dateTo": dateToStr
                    }
                }
            ),
            headers: {
                'Content-Type': "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                const info = {
                    min: (data.min.priceClose).toFixed(2),
                    max: (data.max.priceClose).toFixed(2)
                }
                dispatch(putMinMaxPricesMainTicker(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}


export const fetchMinMaxPriceFirstTicker = (ticker) => {
    const count = 1000 * 60 * 60 * 24 * 365;
    const dateTo = new Date();
    const dateFrom = new Date(dateTo - count);
    const dateToStr = dateStr(dateTo);
    const dateFromStr = dateStr(dateFrom);
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/minMax`, {
            method: 'Post',
            body: JSON.stringify(
                {
                    "names": [ticker],
                    "dateBetween": {
                        "dateFrom": dateFromStr,
                        "dateTo": dateToStr
                    }
                }
            ),
            headers: {
                'Content-Type': "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                const info = {
                    min: (data.min.priceClose).toFixed(2),
                    max: (data.max.priceClose).toFixed(2)
                }
                dispatch(putMinMaxPricesFirstTicker(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}

export const fetchMinMaxPriceSecondTicker = (ticker) => {
    const count = 1000 * 60 * 60 * 24 * 365;
    const dateTo = new Date();
    const dateFrom = new Date(dateTo - count);
    const dateToStr = dateStr(dateTo);
    const dateFromStr = dateStr(dateFrom);
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/minMax`, {
            method: 'Post',
            body: JSON.stringify(
                {
                    "names": [ticker],
                    "dateBetween": {
                        "dateFrom": dateFromStr,
                        "dateTo": dateToStr
                    }
                }
            ),
            headers: {
                'Content-Type': "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                const info = {
                    min: (data.min.priceClose).toFixed(2),
                    max: (data.max.priceClose).toFixed(2)
                }
                dispatch(putMinMaxPricesSecondTicker(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}
