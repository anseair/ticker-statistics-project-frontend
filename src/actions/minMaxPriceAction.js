import {baseUrl, baseUrl8080} from "../utils/constants";
import {
    errorMinMaxPrice,
    putMinMaxPricesFirstTicker,
    putMinMaxPricesMainTicker,
    putMinMaxPricesSecondTicker, putMinMaxPricesTickerForStatistic
} from "../slices/minMaxPriceSlice";

export const fetchMinMaxPriceMainTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        fetch(`${baseUrl8080}/financials/minMax`, {
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
                dispatch(putMinMaxPricesMainTicker(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}

export const fetchMinMaxPriceFirstTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        fetch(`${baseUrl8080}/financials/minMax`, {
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
                dispatch(putMinMaxPricesFirstTicker(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}

export const fetchMinMaxPriceSecondTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        fetch(`${baseUrl8080}/financials/minMax`, {
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
                dispatch(putMinMaxPricesSecondTicker(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}

export const fetchMinMaxPriceTickerForStatistic = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        fetch(`${baseUrl8080}/financials/minMax`, {
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
                dispatch(putMinMaxPricesTickerForStatistic(info))
            })
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}
