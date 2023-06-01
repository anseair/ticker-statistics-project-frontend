import {baseUrl, baseUrl8080} from "../utils/constants";
import {
    errorPrice,
    putPriceMainTicker,
    putPriceFirstTicker,
    putPriceSecondTicker,
    putPrice, putPriceTickerForStatistic, putPriceTickerForStatisticInvestmentPortfolio, pendingPrices
} from "../slices/priceSlice";

export const fetchPriceMainTicker = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}`)
            .then(response=>response.json())
            .then(data => {
                const info = {
                    price: (data.priceClose).toFixed(2),
                    change: (data.change).toFixed(2),
                    changePersent: (data.changePersent).toFixed(2)
                }
                dispatch(putPriceMainTicker(info))
            })
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchPriceFirstTicker = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}`)
            .then(response=>response.json())
            .then(data => {
                const info = {
                    price: (data.priceClose).toFixed(2),
                    change: (data.change).toFixed(2),
                    changePersent: (data.changePersent).toFixed(2)
                }
                dispatch(putPriceFirstTicker(info))
            })
            .catch(e => dispatch(errorPrice()))
    }
}
export const fetchPriceSecondTicker = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl}/financials/ticker/${ticker}`)
            .then(response=>response.json())
            .then(data => {
                const info = {
                    price: (data.priceClose).toFixed(2),
                    change: (data.change).toFixed(2),
                    changePersent: (data.changePersent).toFixed(2)
                }
                dispatch(putPriceSecondTicker(info))
            })
            .catch(e => dispatch(errorPrice()))
    }
}

export const fetchPriceTickerForStatistic = (ticker) => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl}/financials/ticker/${ticker}`);
        const data = await response.json();
        const info = {
                name: data.date.name,
                price: (data.priceClose).toFixed(2),
                change: (data.change).toFixed(2),
                changePersent: (data.changePersent).toFixed(2)
            }
        dispatch(putPriceTickerForStatistic(info))
    }
}


export const fetchPriceTickerForStatisticInvestmentPortfolio = (tickers) => {
    return async (dispatch) => {
        const res = [];
        const response = [];
        for(let i = 0; i < tickers.length; i++){
            response.push(await
                fetch(`${baseUrl}/financials/ticker/${tickers[i]}`)
            );
        }
        const data = await Promise.all(response.map(r => r.json()));
            data.map(data => {
                const info = {
                    name: data.date.name,
                    price: (data.priceClose).toFixed(2),
                    change: (data.change).toFixed(2),
                    changePersent: (data.changePersent).toFixed(2)
                }
                res.push(info);
            })
        dispatch(putPriceTickerForStatisticInvestmentPortfolio(res))
    }
}

export const fetchPrice = (tickers) => {
    return async (dispatch) => {
        dispatch(pendingPrices('Pending'));
        const res = [];
        const response = []
        for(let i = 0; i < tickers.length; i++){
            response.push(await
                fetch(`${baseUrl}/financials/ticker/${tickers[i]}`)
            );
        }
            const data = await Promise.all(response.map(r => r.json()));
            data.map(data => {
                const info = {
                    name: data.date.name,
                    price: (data.priceClose).toFixed(2),
                    change: (data.change).toFixed(2),
                    changePersent: (data.changePersent).toFixed(2)
                }
                res.push(info);
            })
            dispatch(putPrice(res));
            dispatch(pendingPrices('Done'))
    }
}