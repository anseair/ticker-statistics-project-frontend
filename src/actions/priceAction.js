import {baseUrl, baseUrl8080, randomNum} from "../utils/constants";
import {
    errorPrice,
    putPriceMainTicker,
    putPriceFirstTicker,
    putPriceSecondTicker,
    putPrice, putPriceTickerForStatistic, putPriceTickerForStatisticInvestmentPortfolio
} from "../slices/priceSlice";

export const fetchPriceMainTicker = (ticker) => {
    return async (dispatch) => {
        fetch(`${baseUrl8080}/financials/ticker/${ticker}`)
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
        fetch(`${baseUrl8080}/financials/ticker/${ticker}`)
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
        fetch(`${baseUrl8080}/financials/ticker/${ticker}`)
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

export const fetchPriceForStatistic = (ticker) => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl8080}/financials/ticker/${ticker}`);
        const data = await response.json();
        const info = {
                name: data.date.name,
                price: (data.priceClose).toFixed(2),
                change: (data.change).toFixed(2),
                changePersent: (data.changePersent).toFixed(2)
            }
        console.log(info);
        dispatch(putPriceTickerForStatistic(info))
    }
}

export const fetchPriceForStatisticInvestmentPortfolio = (tickers) => {
    return async (dispatch) => {
        const res = [];
            const response = await Promise.all([
                fetch(`${baseUrl8080}/financials/ticker/${tickers[0]}`),
                fetch(`${baseUrl8080}/financials/ticker/${tickers[1]}`),
                fetch(`${baseUrl8080}/financials/ticker/${tickers[2]}`),
            ]);
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
        console.log(res);
        dispatch(putPriceTickerForStatisticInvestmentPortfolio(res))
    }
}

export const fetchPrice = (tickers) => {
    return async (dispatch) => {
        const res = [];
        const randomTickers = randomNum(tickers);
        const response = await Promise.all([
            fetch(`${baseUrl8080}/financials/ticker/${randomTickers[0]}`),
            fetch(`${baseUrl8080}/financials/ticker/${randomTickers[1]}`),
            fetch(`${baseUrl8080}/financials/ticker/${randomTickers[2]}`),
            fetch(`${baseUrl8080}/financials/ticker/${randomTickers[3]}`),
        ]);
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
        console.log(res);
        dispatch(putPrice(res));
    }
}