import {baseUrl, baseUrl8080} from "../utils/constants";
import {
    errorStatistic, errorStatisticForInvestmentPortfolio,
    pendingStatistic,
    pendingStatisticForInvestmentPortfolio,
    putStatistic,
    putStatisticForInvestmentPortfolio
} from "../slices/statisticSlice";
import {errorCorrelation, pendingCorrelation} from "../slices/correlationSlice";

export const fetchStatistic = (ticker, dateFrom, dateTo, depositPeriodDays, depositSum) => {
    return async (dispatch, getState) => {
        dispatch(pendingStatistic('Pending'));
        const response = await fetch(`${baseUrl}/financials/statistic`, {
            method: "POST",
            body: JSON.stringify(
                {
                    "names": [ticker],
                    "dateBetween": {
                        "dateFrom": dateFrom,
                        "dateTo": dateTo
                    },
                    "depositPeriodDays": depositPeriodDays,
                    "depositSum": depositSum
                }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': getState().token

            }
        });
        if (response.ok){
            const data = await response.json();
            const statisticInfo = data;
            dispatch(putStatistic(statisticInfo));
            dispatch(pendingStatistic('Done'))

        } else{
            // throw new Error(response.status.toString());
            dispatch(errorStatistic("Error: " + response.status.toString()));

        }
    }
}

export const fetchStatisticForInvestmentPortfolio = (tickers, dateFrom, dateTo, depositPeriodDays, depositSum) => {
    return async (dispatch, getState) => {
        dispatch(pendingStatisticForInvestmentPortfolio('Pending'));
        const response = await fetch(`${baseUrl}/financials/statistic/investmentPortfolio`, {
            method: "POST",
            body: JSON.stringify(
                {
                    "names": tickers,
                    "dateBetween": {
                        "dateFrom": dateFrom,
                        "dateTo": dateTo
                    },
                    "depositPeriodDays": depositPeriodDays,
                    "depositSum": depositSum
                }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': getState().token
            }
        });
        if (response.ok){
            const data = await response.json();
            const statisticInfo = data;
            dispatch(putStatisticForInvestmentPortfolio(statisticInfo));
            dispatch(pendingStatisticForInvestmentPortfolio('Done'))
        } else{
            // throw new Error(response.status.toString());
            dispatch(errorStatisticForInvestmentPortfolio("Error: " + response.status.toString()));

        }
    }
}