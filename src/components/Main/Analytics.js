import React, {useEffect, useState} from 'react';
import '../../CSS/analytics.css'
import '../../CSS/correlation.css'
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import {useDispatch, useSelector} from "react-redux";

import {fetchCorrelation} from "../../actions/correlationAction";
import {fetchStatistic, fetchStatisticForInvestmentPortfolio} from "../../actions/statisticAction";
import {CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment/moment";
import {
    fetchAllPricesFirstTicker,
    fetchAllPricesSecondTicker
} from "../../actions/allPricesForDiagramAction";
import {names} from "../../utils/constants";
import TickerForInvestmentPortfolio from "./TickerForInvestmentPortfolio";

const Analytics = () => {
    const {correlation} = useSelector(state => state.correlation);
    const {statistic, statisticForInvestmentPortfolio} = useSelector(state => state.statisticInfo);
    const {allPricesFirstTicker, allPricesSecondTicker} = useSelector(state => state.allPricesForDiagram);
    const dispatch = useDispatch();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [firstTicker, setFirstTicker] = useState('');
    const [secondTicker, setSecondTicker] = useState('');
    const [firstTicker1, setFirstTicker1] = useState();
    const [secondTicker1, setSecondTicker1] = useState();
    const [allPrices, setAllPrices] = useState();

    const [ticker, setTicker] = useState('');
    const [ticker1, setTicker1] = useState();

    const [dateFrom2, setDateFrom2] = useState('');
    const [dateTo2, setDateTo2] = useState('');
    const [depositPeriodDays, setDepositPeriodDays] = useState('');
    const [depositSum, setDepositSum] = useState('');

    const [tickers, setTickers] = useState();
    const [tickers1, setTickers1] = useState();

    const [dateFrom3, setDateFrom3] = useState('');
    const [dateTo3, setDateTo3] = useState('');
    const [depositPeriodDays2, setDepositPeriodDays2] = useState('');
    const [depositSum2, setDepositSum2] = useState('');

    useEffect(() => {
        const pricesAll = JSON.parse(localStorage.getItem('pricesAll'));
        setAllPrices(pricesAll);

        // const tickerFirst = localStorage.getItem('firstTicker');
        // const tickerSecond = localStorage.getItem('secondTicker');
        // const tickerFirstName = localStorage.getItem('firstTickerName');
        // const tickerSecondName = localStorage.getItem('secondTickerName');
        // if (pricesAll) {
        //     if (tickerFirst || tickerFirstName) {
        //         setFirstTicker(tickerFirstName);
        //         setFirstTicker1(tickerFirst)
        //     }
        //     const ticker1 = pricesAll.map(item => item).filter(item => item.name === tickerFirstName);
        //     localStorage.setItem('firstTicker', JSON.stringify(ticker1[0]))
        //     setFirstTicker1(ticker1[0])
        //     if (tickerSecond || tickerSecondName) {
        //         setSecondTicker(tickerSecondName);
        //         setSecondTicker1(tickerSecond)
        //     }
        //     const ticker2 = pricesAll.map(item => item).filter(item => item.name === tickerSecondName);
        //     localStorage.setItem('secondTicker', JSON.stringify(ticker2[0]))
        //     setSecondTicker1(ticker2[0])
        // }
    }, [])

    const handleChangeFirstTicker = (e) => {
        const firstTicker = e.target.value;
        setFirstTicker(firstTicker);
    }

    const handleChangeSecondTicker = (e) => {
        const secondTicker = e.target.value;
        setSecondTicker(secondTicker);
    }

    const handleChangeDateFrom = (e) => {
        const dateFrom = e.target.value;
        setDateFrom(dateFrom);
    }

    const handleChangeDateTo = (e) => {
        const dateTo = e.target.value;
        setDateTo(dateTo);
    }

    const handleClickCorrelation = () => {
        const ticker1 = allPrices.map(item => item).filter(item => item.name === firstTicker);
        setFirstTicker1(ticker1[0]);
        const ticker2 = allPrices.map(item => item).filter(item => item.name === secondTicker);
        setSecondTicker1(ticker2[0]);
        dispatch(fetchCorrelation(firstTicker, secondTicker, dateFrom, dateTo));
        dispatch(fetchAllPricesFirstTicker(firstTicker, dateFrom, dateTo));
        dispatch(fetchAllPricesSecondTicker(secondTicker, dateFrom, dateTo));
    }

    const handleChangeTicker = (e) => {
        const ticker = e.target.value;
        setTicker(ticker);
    }

    const handleClickStatistic = () => {
        const ticker2= allPrices.map(item => item).filter(item => item.name === ticker);
        setTicker1(ticker2[0]);
        dispatch(fetchStatistic(ticker, dateFrom2, dateTo2, depositPeriodDays, depositSum));
    }

    const handleChangeTickers = (e) => {
        const tickers = e.target.value.trim().replaceAll(" ", "").split(",");
        setTickers(tickers);
    }

    const handleClickStatisticForInvestmentPortfolio = () => {
        const tickers2 = [];
        for (let i = 0; i < tickers.length; i++) {
            const ticker2 = allPrices.map(item => item).filter(item => item.name === tickers[i]);
            tickers2.push(ticker2[0]);
        }
        setTickers1(tickers2);
        dispatch(fetchStatisticForInvestmentPortfolio(tickers, dateFrom3, dateTo3, depositPeriodDays2, depositSum2));
    }

    const CustomTooltip = ({payload}) => {
        if (payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="text">{`${payload[0].payload.date}`}</p>
                    <p className="text">{`${firstTicker}: ${payload[0].payload.value}`}</p>
                    <p className="text">{`${secondTicker}: ${payload[1].payload.value}`}</p>
                </div>
            );
        }
    };

    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1>Analytics</h1>
                </div>
            </section>
            <section className="page-statistic">
                <div className="page-statistic__main">
                    <div className="correlationPage__form" id="form">
                        <div className="input__container">
                            <label htmlFor="dateFrom">From</label>
                            <input type="date" id="dateFrom" className="text"
                                   onChange={handleChangeDateFrom}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="dateTo">To</label>
                            <input type="date" id="dateTo" className="text"
                                   onChange={handleChangeDateTo}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">First stock</label>
                            <input type="text" id="stock" placeholder="APPL" className="text"
                                   onChange={handleChangeFirstTicker}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">Second stock</label>
                            <input type="text" id="stock" placeholder="AMZN" className="text"
                                   onChange={handleChangeSecondTicker}/>
                        </div>
                        <button type="submit" className="button form__button correlation__button"
                                id="statsBtn" onClick={handleClickCorrelation}>
                            Calculate
                        </button>
                    </div>
                    <div className={"chart"}>
                        <LineChart width={900} height={350} margin={{top: 25, right: 5, bottom: 5}}>
                            <defs>
                                <filter id="shadow">
                                    <feDropShadow dx="0" dy="2" stdDeviation="3"/>
                                </filter>
                            </defs>
                            <XAxis dataKey="date" xAxisId={"price"}
                                   interval={allPricesFirstTicker.length < 25 ? 3 :
                                       allPricesFirstTicker.length < 400 ? 30 : allPricesFirstTicker.length < 900 ? 100 : allPricesFirstTicker.length < 2000 ? 400 :
                                           allPricesFirstTicker.length < 2600 ? 700 : 1000} axisLine={false}
                                   tickFormatter={allPricesFirstTicker.length < 25 ? ((tickItem) => moment(tickItem).format("D MMM.")) :
                                       allPricesFirstTicker.length < 2600 ? ((tickItem) => moment(tickItem).format("MMM. YYYY")) :
                                           ((tickItem) => moment(tickItem).format("YYYY"))}
                            />
                            <XAxis dataKey="date2" hide={true} xAxisId={"price2"}
                                   interval={allPricesSecondTicker.length < 25 ? 3 :
                                       allPricesSecondTicker.length < 400 ? 30 : allPricesFirstTicker.length < 900 ? 100 : allPricesFirstTicker.length < 2000 ? 400 :
                                           allPricesFirstTicker.length < 2600 ? 700 : 1000} axisLine={false}
                                   tickFormatter={allPricesSecondTicker.length < 25 ? ((tickItem) => moment(tickItem).format("D MMM.")) :
                                       allPricesSecondTicker.length < 2600 ? ((tickItem) => moment(tickItem).format("MMM. YYYY")) :
                                           ((tickItem) => moment(tickItem).format("YYYY"))}
                            />
                            <YAxis
                                label={{
                                    value: `${firstTicker} / $`, offset: 15, angle: -90, position: 'insideLeft'
                                }}
                                dataKey="price" domain={['auto', 'auto']} yAxisId={"left"}/>
                            <YAxis
                                label={{
                                    value: `${secondTicker} / $`, offset: 5, angle: -90, position: 'insideRight'
                                }}
                                dataKey="price2" domain={['auto', 'auto']} yAxisId={"right"}
                                orientation={"right"}>
                                <Label value={`${correlation.substring(0, correlation.indexOf(":"))}`} offset={-40}
                                       position="bottom"/>
                            </YAxis>
                            <CartesianGrid strokeWidth="0.5"/>
                            <Tooltip content={<CustomTooltip/>}/>
                            <Legend
                                payload={[
                                    {
                                        value: `${firstTicker}`,
                                        type: "line",
                                        color: "#2727cb",
                                    },
                                    {
                                        value: `${secondTicker}`,
                                        type: "line",
                                        color: "#ff8a34",
                                    },
                                ]}
                                verticalAlign="bottom" align={"center"} height={36} ic/>
                            <Line data={allPricesFirstTicker} xAxisId={"price"} yAxisId={"left"} type="monotone"
                                  dataKey="price" stroke="#2727cb" dot={false} filter="url(#shadow)"
                            />
                            <Line data={allPricesSecondTicker} xAxisId={"price2"} yAxisId={"right"}
                                  type="monotone" dataKey="price2" stroke="#ff8a34" dot={false} filter="url(#shadow)"
                            />
                        </LineChart>
                    </div>
                    <div className={styleStat.correlation}>
                        {correlation &&
                            <>
                                <p className={styleStat.stock__name}>Correlation
                                    between {names(firstTicker)} and {names(secondTicker)} is {correlation}</p>
                                <p>The correlation between historical prices or returns
                                    on {names(firstTicker)} and {names(secondTicker)} is
                                    a relative statistical measure of the degree to which these equity instruments
                                    tend to move together. The correlation coefficient measures the extent to which
                                    returns on {names(secondTicker)} Class are associated (or correlated)
                                    with {names(firstTicker)}. Values
                                    of the correlation coefficient range from -1 to +1, where. The correlation of
                                    zero (0) is possible when the price movement of {names(firstTicker)} has no effect
                                    on the
                                    direction
                                    of {names(secondTicker)} i.e., {names(secondTicker)} and {names(firstTicker)} go up
                                    and down completely
                                    randomly.</p>
                            </>
                        }
                    </div>
                    <h4>STATISTIC FOR INDEX</h4>
                    <div className="correlationPage__form" id="form">
                        <div className="input__container">
                            <label htmlFor="dateFrom">From</label>
                            <input type="date" id="dateFrom" className="text"
                                   onChange={(e) => setDateFrom2(e.target.value)}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="dateTo">To</label>
                            <input type="date" id="dateTo" className="text"
                                   onChange={(e) => setDateTo2(e.target.value)}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">Stock</label>
                            <input type="text" id="stock" placeholder="^GSPC" className="text"
                                   onChange={handleChangeTicker}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">deposit period days</label>
                            <input type="number" className="text"
                                   onChange={(e) => setDepositPeriodDays(e.target.value)}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">deposit summa</label>
                            <input type="number" className="text"
                                   onChange={(e) => setDepositSum(e.target.value)}/>
                        </div>
                        <button type="submit" className="button form__button correlation__button"
                                id="statsBtn" onClick={handleClickStatistic}>
                            Calculate
                        </button>
                    </div>
                    <div className={styleStat.correlation}>
                        {ticker1 &&
                            <>
                                <h3 className={styleStat.stock__name}>{names(ticker1.name)}</h3>
                                <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                                <div className={styleStat.price__now}>
                                    <span className={styleStat.prise}>{ticker1.price}</span>
                                    <span
                                        className={ticker1.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{ticker1.change}</span>
                                    <span
                                        className={ticker1.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({ticker1.changePersent})%</span>
                                </div>
                                <p>High/low for 52 week</p>
                                <p className="fw-bold">{ticker1.max} / {ticker1.min}</p>
                            </>
                        }
                        <table className="table table-hover table-light table-statistic">
                            {statistic.minStat && statistic.maxStat &&
                                <tbody>
                                <tr>MAXIMUM:</tr>
                                <tr>
                                    <th>Maximum price start:</th>
                                    <th>{statistic.maxStat.maxPriceStart} ({statistic.maxStat.maxDateStart})</th>
                                </tr>
                                <tr>
                                    <th>Maximum price end:</th>
                                    <th>{statistic.maxStat.maxPriceEnd} ({statistic.maxStat.maxDateEnd})</th>
                                </tr>
                                <tr>
                                    <th>Maximum percent APY:</th>
                                    <th>{statistic.maxStat.maxPercentApy} </th>
                                </tr>
                                <tr>
                                    <th>Maximum revenue:</th>
                                    <th>{statistic.maxStat.maxRevenue} </th>
                                </tr>
                                <tr>MINIMUM:</tr>
                                <tr>
                                    <th>Minimum price start:</th>
                                    <th>{statistic.minStat.minPriceStart} ({statistic.minStat.minDateStart})</th>
                                </tr>
                                <tr>
                                    <th>Minimum price end:</th>
                                    <th>{statistic.minStat.minPriceEnd} ({statistic.minStat.minDateEnd})</th>
                                </tr>
                                <tr>
                                    <th>Minimum percent APY:</th>
                                    <th>{statistic.minStat.minPercentApy} </th>
                                </tr>
                                <tr>
                                    <th>Minimum revenue:</th>
                                    <th>{statistic.minStat.minRevenue} </th>
                                </tr>
                                <tr>AVERAGE:</tr>
                                <tr>
                                    <th>Average percent:</th>
                                    <th>{statistic.avgPercent} </th>
                                </tr>
                                <tr>
                                    <th>Average revenue:</th>
                                    <th>{statistic.avgRevenue} </th>
                                </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                    <h4>STATISTIC FOR INVESTMENT PORTFOLIO</h4>
                    <div className="correlationPage__form" id="form">
                        <div className="input__container">
                            <label htmlFor="dateFrom">From</label>
                            <input type="date" id="dateFrom" className="text"
                                   onChange={(e) => setDateFrom3(e.target.value)}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="dateTo">To</label>
                            <input type="date" id="dateTo" className="text"
                                   onChange={(e) => setDateTo3(e.target.value)}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">Stock</label>
                            <input type="text" id="stock" placeholder="APPL, AMZN, MSFT" className="text"
                                   onChange={handleChangeTickers}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">deposit period days</label>
                            <input type="number" className="text"
                                   onChange={(e) => setDepositPeriodDays2(e.target.value)}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="stock">deposit summa</label>
                            <input type="number" className="text"
                                   onChange={(e) => setDepositSum2(e.target.value)}/>
                        </div>
                        <button type="submit" className="button form__button correlation__button"
                                id="statsBtn" onClick={handleClickStatisticForInvestmentPortfolio}>
                            Calculate
                        </button>
                    </div>
                    <div className={styleStat.correlation}>
                        {tickers1 &&
                        <div className="tickers">
                            {tickers1.map((t, i) =>
                                <TickerForInvestmentPortfolio key={i} name={t.name} price={t.price} change={t.change}
                                                              changePersent={t.changePersent}/>)}
                        </div>
                        }
                        <table className="table table-hover table-light table-statistic">
                            {statisticForInvestmentPortfolio.minStat && statisticForInvestmentPortfolio.maxStat &&
                                <tbody>
                                <tr>MAXIMUM:</tr>
                                <tr>
                                    <th>Maximum price start:</th>
                                    <th>{statisticForInvestmentPortfolio.maxStat.maxPriceStart} ({statisticForInvestmentPortfolio.maxStat.maxDateStart})</th>
                                </tr>
                                <tr>
                                    <th>Maximum price end:</th>
                                    <th>{statisticForInvestmentPortfolio.maxStat.maxPriceEnd} ({statisticForInvestmentPortfolio.maxStat.maxDateEnd})</th>
                                </tr>
                                <tr>
                                    <th>Maximum percent APY:</th>
                                    <th>{statisticForInvestmentPortfolio.maxStat.maxPercentApy} </th>
                                </tr>
                                <tr>
                                    <th>Maximum revenue:</th>
                                    <th>{statisticForInvestmentPortfolio.maxStat.maxRevenue} </th>
                                </tr>
                                <tr>MINIMUM:</tr>
                                <tr>
                                    <th>Minimum price start:</th>
                                    <th>{statisticForInvestmentPortfolio.minStat.minPriceStart} ({statisticForInvestmentPortfolio.minStat.minDateStart})</th>
                                </tr>
                                <tr>
                                    <th>Minimum price end:</th>
                                    <th>{statisticForInvestmentPortfolio.minStat.minPriceEnd} ({statisticForInvestmentPortfolio.minStat.minDateEnd})</th>
                                </tr>
                                <tr>
                                    <th>Minimum percent APY:</th>
                                    <th>{statisticForInvestmentPortfolio.minStat.minPercentApy} </th>
                                </tr>
                                <tr>
                                    <th>Minimum revenue:</th>
                                    <th>{statisticForInvestmentPortfolio.minStat.minRevenue} </th>
                                </tr>
                                <tr>AVERAGE:</tr>
                                <tr>
                                    <th>Average percent:</th>
                                    <th>{statisticForInvestmentPortfolio.avgPercent} </th>
                                </tr>
                                <tr>
                                    <th>Average revenue:</th>
                                    <th>{statisticForInvestmentPortfolio.avgRevenue} </th>
                                </tr>
                                </tbody>
                            }
                        </table>
                        {/*<div className="correlation__chart">*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="page-analytics__sideBar">
                    {firstTicker1 &&
                    <div className={styleStat.stock__info}>
                        <h3 className={styleStat.stock__name}>{names(firstTicker1.name)}</h3>
                        <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                                <div className={styleStat.price__now}>
                                    <span className={styleStat.prise}>{firstTicker1.price}</span>
                                    <span
                                        className={firstTicker1.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{firstTicker1.change}</span>
                                    <span
                                        className={firstTicker1.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({firstTicker1.changePersent})%</span>
                                </div>
                                <p>High/low for 52 week</p>
                                <p className="fw-bold">{firstTicker1.max} / {firstTicker1.min}</p>
                    </div>
                    }
                    {secondTicker1 &&
                    <div className={styleStat.stock__info}>
                        <h3 className={styleStat.stock__name}>{names(secondTicker1.name)}</h3>
                        <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                                <div className={styleStat.price__now}>
                                    <span className={styleStat.prise}>{secondTicker1.price}</span>
                                    <span
                                        className={secondTicker1.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{secondTicker1.change}</span>
                                    <span
                                        className={secondTicker1.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({secondTicker1.changePersent})%</span>
                                </div>

                                <p>High/low for 52 week</p>
                                <p className="fw-bold">{secondTicker1.max} / {secondTicker1.min}</p>
                        </div>
                    }
                </div>
            </section>
            {/*<section className="analysis">*/}
            {/*    <h2>*/}
            {/*    </h2>*/}
            {/*</section>*/}
            {/*</div>*/}
        </>
    );
};

export default Analytics;