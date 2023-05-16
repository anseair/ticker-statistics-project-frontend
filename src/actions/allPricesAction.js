import {baseUrl8080} from "../utils/constants";
import {putAllDates, putAllPrices} from "../slices/allPricesSlice";

export const fetchAllPrices = (ticker, dateFrom, dateTo) => {
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
                    date:data[i].date.date,
                    price: data[i].priceClose
                }
                info.push(info2);
            }
            console.log(info);
            dispatch(putAllPrices(info));
        } else{
            throw new Error(response.status.toString())
        }
    }
}