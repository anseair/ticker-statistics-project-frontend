import {baseUrl, baseUrl8080} from "../utils/constants";
import {putCorrelation} from "../slices/correlationSlice";

export const fetchCorrelation = (firstTicker, secondTicker, dateFrom, dateTo) => {
    return async(dispatch) => {
        const response = await fetch (`${baseUrl8080}/financials/correlation`, {
            method: 'POST',
            body: JSON.stringify({
                names: [firstTicker, secondTicker],
                dateBetween: {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            }),
            headers: {
                'Content-Type': "application/json",
            }
        });
        if (response.ok){
            const data = await response.text();
            dispatch(putCorrelation(data));
        } else{
            throw new Error(response.status.toString());
        }
    }
}