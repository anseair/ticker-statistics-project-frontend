import {baseUrl, baseUrl8080} from "../utils/constants";
import {
    errorMaxMinPrice,
    putMaxPriceFirstTicker,
    putMaxPriceMainTicker,
    putMaxPriceSecondTicker,
    putMinPriceFirstTicker,
    putMinPriceMainTicker, putMinPriceSecondTicker,
} from "../slices/maxAndMinPriceSlice";
import {errorPrice, putBeforePriceAMZN, putPriceAMZN} from "../slices/priceSlice";

export const fetchMaxMinPriceMainTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/max` , {
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
            fetch(`${baseUrl}/financials/min`, {
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
                Promise.all([dispatch(putMaxPriceMainTicker(price1)), dispatch(putMinPriceMainTicker(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchMaxMinPriceFirstTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/max` , {
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
            fetch(`${baseUrl}/financials/min`, {
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
                Promise.all([dispatch(putMaxPriceFirstTicker(price1)), dispatch(putMinPriceFirstTicker(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchMaxMinPriceSecondTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/max` , {
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
            fetch(`${baseUrl}/financials/min`, {
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
                Promise.all([dispatch(putMaxPriceSecondTicker(price1)), dispatch(putMinPriceSecondTicker(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}