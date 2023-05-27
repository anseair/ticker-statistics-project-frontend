import {baseUrl, baseUrl8080} from "../utils/constants";
import {putStatistic, putStatisticForInvestmentPortfolio} from "../slices/statisticSlice";

export const fetchStatistic = (ticker, dateFrom, dateTo, depositPeriodDays, depositSum) => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl8080}/financials/statistic`, {
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
                'Content-type': 'application/json'
            }
        });
        if (response.ok){
            const data = await response.json();
            const statisticInfo = data;
            dispatch(putStatistic(statisticInfo));
        } else{
            throw new Error(response.status.toString());
        }
    }
}

export const fetchStatisticForInvestmentPortfolio = (tickers, dateFrom, dateTo, depositPeriodDays, depositSum) => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl8080}/financials/statistic/investmentPortfolio`, {
            method: "POST",
            body: JSON.stringify(
                {
                    "names": [tickers],
                    "dateBetween": {
                        "dateFrom": dateFrom,
                        "dateTo": dateTo
                    },
                    "depositPeriodDays": depositPeriodDays,
                    "depositSum": depositSum
                }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (response.ok){
            const data = await response.json();
            const statisticInfo = data;
            dispatch(putStatisticForInvestmentPortfolio(statisticInfo));
        } else{
            throw new Error(response.status.toString());
        }
    }
}