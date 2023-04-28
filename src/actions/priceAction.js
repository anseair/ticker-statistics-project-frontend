import {baseUrl} from "../utils/constants";
import {errorPrice, putPrice, putPriceAAPL, putPriceAMZN, putPriceGOOG, putPriceINTC, putPriceMSFT, putPriceTSLA, putPriceGSPC} from "../slices/priceSlice";

export const fetchLastPrice = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPrice(price)))
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchLastPriceAAPL = (ticker) => {
    return async (dispatch) => {
       fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
           .then(response => response.json())
           .then(data => data.priceClose)
           .then(price => dispatch(putPriceAAPL(price)))
           .catch(e => dispatch(errorPrice()))
    }
}

export const fetchLastPriceAMZN = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPriceAMZN(price)))
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchLastPriceGOOG = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPriceGOOG(price)))
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchLastPriceINTC = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPriceINTC(price)))
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchLastPriceMSFT = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPriceMSFT(price)))
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchLastPriceTSLA = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPriceTSLA(price)))
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchLastPriceGSPC = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}/2023-04-20`)
            .then(response => response.json())
            .then(data => data.priceClose)
            .then(price => dispatch(putPriceGSPC(price)))
            .catch(e => dispatch(errorPrice()))
    }
}
