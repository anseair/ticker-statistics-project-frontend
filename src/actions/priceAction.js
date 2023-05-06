import {baseUrl, baseUrl8080} from "../utils/constants";
import {
    errorPrice,
    putPrice,
    putPriceAAPL,
    putPriceMSFT,
    putPriceTSLA,
    putPriceGSPC,
    putPriceMainTicker,
    putPriceFirstTicker,
    putPriceSecondTicker,
    putBeforePriceMainTicker,
    putBeforePriceFirstTicker,
    putBeforePriceSecondTicker,
    putBeforePrice,
    putBeforePriceAAPL,
    putBeforePriceMSFT,
    putBeforePriceTSLA,
    putBeforePriceGSPC,
    putBeforePriceAMZN,
    putPriceAMZN
} from "../slices/priceSlice";

export const fetchPriceMainTicker = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceMainTicker(price1)), dispatch(putBeforePriceMainTicker(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchPriceFirstTicker = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceFirstTicker(price1)), dispatch(putBeforePriceFirstTicker(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchPriceSecondTicker = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceSecondTicker(price1)), dispatch(putBeforePriceSecondTicker(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchPrice = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`)
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPrice(price1)), dispatch(putBeforePrice(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchPriceAAPL = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceAAPL(price1)), dispatch(putBeforePriceAAPL(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchPriceAMZN = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceAMZN(price1)), dispatch(putBeforePriceAMZN(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchPriceMSFT = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceMSFT(price1)), dispatch(putBeforePriceMSFT(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchPriceTSLA = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceTSLA(price1)), dispatch(putBeforePriceTSLA(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchPriceGSPC = (ticker) => {
    return async (dispatch) => {
        Promise.all([
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`),
            fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-19`),
        ])
            .then(([response1, response2]) =>
                Promise.all([response1.json(), response2.json()])
            )
            .then(([data1, data2]) =>
                Promise.all([data1.priceClose, data2.priceClose])
            )
            .then(([price1, price2]) =>
                Promise.all([dispatch(putPriceGSPC(price1)), dispatch(putBeforePriceGSPC(price2))])
            )
            .catch(e => dispatch(errorPrice()))
    }
}
