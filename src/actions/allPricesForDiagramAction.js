import {baseUrl8080} from "../utils/constants";
import {
    putAllPricesFirstTicker,
    putAllPricesMainTicker,
    putAllPricesSecondTicker
} from "../slices/allPricesForDiagramSlice";

export const fetchAllPricesMainTicker = (ticker, dateFrom, dateTo) => {
    return async (dispatch) => {
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
            console.log(info);
            dispatch(putAllPricesMainTicker(info));
        } else{
            throw new Error(response.status.toString())
        }
    }
}

export const fetchAllPricesFirstTicker = (firstTicker, dateFrom, dateTo) => {
    return async (dispatch) => {
        const response = await(fetch(`${baseUrl8080}/financials/period`, {
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
            console.log(info);
            dispatch(putAllPricesFirstTicker(info));
        } else{
            throw new Error(response.status.toString())
        }
    }
}

export const fetchAllPricesSecondTicker = (secondTicker, dateFrom, dateTo) => {
    return async (dispatch) => {
        const response = await(fetch(`${baseUrl8080}/financials/period`, {
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
            console.log(info);
            dispatch(putAllPricesSecondTicker(info));
        } else{
            throw new Error(response.status.toString())
        }
    }
}