import {baseUrl, baseUrl8080} from "../utils/constants";
import {
    errorMinMaxPrice, putMaxPriceFirstTicker,
    putMaxPriceMainTicker, putMaxPriceSecondTicker,
    putMinPriceFirstTicker,
    putMinPriceMainTicker, putMinPriceSecondTicker
} from "../slices/minMaxPriceSlice";

export const fetchMinMaxPriceMainTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/min` , {
                method: 'Post',
                body: JSON.stringify(
                    {
                        "names": [ticker],
                        "dateBetween":{
                            "dateFrom": dateFrom,
                            "dateTo": dateTo
                        }
                    }
                ),
                headers: {
                    'Content-Type': "application/json",
                }
            }),
            fetch(`${baseUrl}/financials/max`, {
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
            }),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putMinPriceMainTicker(price1)), dispatch(putMaxPriceMainTicker(price2))])
            )
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}

export const fetchMinMaxPriceFirstTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/min` , {
                method: 'Post',
                body: JSON.stringify(
                    {
                        "names": [ticker],
                        "dateBetween":{
                            "dateFrom": dateFrom,
                            "dateTo": dateTo
                        }
                    }
                ),
                headers: {
                    'Content-Type': "application/json",
                }
            }),
            fetch(`${baseUrl}/financials/max`, {
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
            }),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putMinPriceFirstTicker(price1)), dispatch(putMaxPriceFirstTicker(price2))])
            )
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}

export const fetchMinMaxPriceSecondTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/min` , {
                method: 'Post',
                body: JSON.stringify(
                    {
                        "names": [ticker],
                        "dateBetween":{
                            "dateFrom": dateFrom,
                            "dateTo": dateTo
                        }
                    }
                ),
                headers: {
                    'Content-Type': "application/json",
                }
            }),
            fetch(`${baseUrl}/financials/max`, {
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
            }),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putMinPriceSecondTicker(price1)), dispatch(putMaxPriceSecondTicker(price2))])
            )
            .catch(e => dispatch(errorMinMaxPrice()))
    }
}