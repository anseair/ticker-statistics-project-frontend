import {baseUrl, baseUrl8080, dateStr} from "../utils/constants";
import {
    putAllPricesFirstTicker,
    putAllPricesMainTicker,
    putAllPricesSecondTicker
} from "../slices/allPricesForDiagramSlice";

export const fetchAllPricesMainTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch, getState) => {
        const response = await(fetch(`${baseUrl8080}/financials/period`, {
            method: "POST",
            body: JSON.stringify({
                names: [ticker],
                dateBetween: {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            }),
            headers: {
                'Content-Type': "application/json",
                'Authorization': getState().token
            }
        }));
        if (response.ok){
            const data = await response.json();
            const info = [];
            for (let i = 0; i < data.length; i++) {
                const info2 = {
                    date: data[i].date.date,
                    price: data[i].priceClose
                }
                info.push(info2);
            }
            dispatch(putAllPricesMainTicker(info));
        } else{
            throw new Error(response.status.toString())
        }
    }
}

export const fetchAllPricesMainTickerForFiveDays = (ticker) => {
    const count = 1000 * 60 * 60 * 24 * 5;
    const dateTo = new Date();
    const dateFrom = new Date(dateTo - count);
    const dateToStr = dateStr(dateTo);
    const dateFromStr = dateStr(dateFrom);
    return async (dispatch, getState) => {
        const response = await(fetch(`${baseUrl}/financials/period`, {
            method: "POST",
            body: JSON.stringify({
                names: [ticker],
                dateBetween: {
                    dateFrom: dateFromStr,
                    dateTo: dateToStr
                }
            }),
            headers: {
                'Content-Type': "application/json",
                'Authorization': getState().token
            }
        }));
        if (response.ok){
            const data = await response.json();
            const info = [];
            for (let i = 0; i < data.length; i++) {
                const info2 = {
                    date: data[i].date.date,
                    price: data[i].priceClose
                }
                info.push(info2);
            }
            dispatch(putAllPricesMainTicker(info));
        } else{
            throw new Error(response.status.toString())
        }
    }
}

export const fetchAllPricesFirstTicker = (firstTicker, dateFrom, dateTo) => {
    return async (dispatch, getState) => {
        const response = await(fetch(`${baseUrl}/financials/period`, {
            method: "POST",
            body: JSON.stringify({
                names: [firstTicker],
                dateBetween: {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            }),
            headers: {
                'Content-Type': "application/json",
                'Authorization': getState().token
            }
        }));
        if (response.ok){
            const data = await response.json();
            const info = [];
            for (let i = 0; i < data.length; i++) {
                const info2 = {
                    date: data[i].date.date,
                    price: data[i].priceClose
                }
                info.push(info2);
            }
            dispatch(putAllPricesFirstTicker(info));

        } else{
            throw new Error(response.status.toString())
        }
    }
}

export const fetchAllPricesSecondTicker = (secondTicker, dateFrom, dateTo) => {
    return async (dispatch, getState) => {
        const response = await(fetch(`${baseUrl}/financials/period`, {
            method: "POST",
            body: JSON.stringify({
                names: [secondTicker],
                dateBetween: {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            }),
            headers: {
                'Content-Type': "application/json",
                'Authorization': getState().token
            }
        }));
        if (response.ok){
            const data = await response.json();
            const info = [];
            for (let i = 0; i < data.length; i++) {
                const info2 = {
                    date: data[i].date.date,
                    price2: data[i].priceClose
                }
                info.push(info2);
            }
            dispatch(putAllPricesSecondTicker(info));
        } else{
            throw new Error(response.status.toString())
        }
    }
}