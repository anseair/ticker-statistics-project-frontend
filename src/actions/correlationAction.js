import {baseUrl, baseUrl8080} from "../utils/constants";
import {errorCorrelation, pendingCorrelation, putCorrelation} from "../slices/correlationSlice";

export const fetchCorrelation = (firstTicker, secondTicker, dateFrom, dateTo) => {
    return async(dispatch, getState) => {
        dispatch(pendingCorrelation('Pending'));
        const response = await fetch (`${baseUrl}/financials/correlation`, {
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
                'Authorization': getState().token
            }
        });
        if (response.ok){
            const data = await response.text();
            dispatch(putCorrelation(data));
            dispatch(pendingCorrelation('Done'))

        } else{
            // throw new Error(response.status.toString());
            dispatch(errorCorrelation("Error: " + response.status.toString()));
        }
    }
}