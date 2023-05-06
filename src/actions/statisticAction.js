import {baseUrl, baseUrl8080} from "../utils/constants";
import {putStatistic} from "../slices/statisticSlice";

export const fetchStatistic = (ticker, dateFrom, dateTo, depositPeriodDays, depositSum) => {
    return async (dispatch) => {
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
                'Content-type': 'application/json'
            }
        });
        if (response.ok){
            const data = await response.json();
            const statisticInfo = {
                tickerNames: [data.tickerNames],
                depositPeriodDays: data.depositPeriodDays,
                depositSum: data.depositSum,
                minStat: {
                    minDateStart: data.minStat.minDateStart,
                    minDateEnd: data.minStat.minDateEnd,
                    minPriceStart: data.minStat.minPriceStart,
                    minPriceEnd: data.minStat.minPriceEnd,
                    minPercentApy: data.minStat.minPercentApy,
                    minRevenue: data.minStat.minRevenue
                },
                maxStat: {
                    maxDateStart: data.maxStat.maxDateStart,
                    maxDateEnd: data.maxStat.maxDateEnd,
                    maxPriceStart: data.maxStat.maxPriceStart,
                    maxPriceEnd: data.maxStat.maxPriceEnd,
                    maxPercentApy: data.maxStat.maxPercentApy,
                    maxRevenue: data.maxStat.maxRevenue
                },
                avgPercent: data.avgPercent,
                avgRevenue: data.avgRevenue
            };
            dispatch(putStatistic(statisticInfo));
        } else{
            throw new Error(response.status.toString());
        }
    }
}