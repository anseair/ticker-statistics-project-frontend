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
import {names, navItems, randomNum} from "../../utils/constants";
import TickerForInvestmentPortfolio from "./TickerForInvestmentPortfolio";
import {fetchPrice} from "../../actions/priceAction";
import {fetchTickers} from "../../actions/tickersAction";
import {fetchUser} from "../../actions/accoutAction";
import {useNavigate} from "react-router-dom";

const Analytics = () => {
    const {text} = useSelector(state => state.prices);

    const {correlation, textCorrelation, errorCorrelation} = useSelector(state => state.correlation);

    const {
        statistic,
        statisticForInvestmentPortfolio,
        textStatisticForInvestmentPortfolio,
        textStatistic,
        errorStatistic,
        errorStatisticForInvestmentPortfolio
    } = useSelector(state => state.statisticInfo);
    const {allPricesFirstTicker, allPricesSecondTicker} = useSelector(state => state.allPricesForDiagram);
    const dispatch = useDispatch();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [firstTickerName, setFirstTickerName] = useState('');
    const [secondTickerName, setSecondTickerName] = useState('');
    const [firstTicker, setFirstTicker] = useState();
    const [secondTicker, setSecondTicker] = useState();
    const [allPrices, setAllPrices] = useState();
    const [allDescriptions, setAllDescriptions] = useState();
    const [firstTickerDescription, setFirstTickerDescription] = useState();
    const [secondTickerDescription, setSecondTickerDescription] = useState();

    const [correlation2, setCorrelation] = useState('');

    const [tickerNameForStatistic, setTickerNameForStatistic] = useState('');
    const [tickerForStatistic, setTickerForStatistic] = useState();
    const [dateFromForStatistic, setDateFromForStatistic] = useState('');
    const [dateToForStatistic, setDateToForStatistic] = useState('');
    const [depositPeriodDays, setDepositPeriodDays] = useState('');
    const [depositSum, setDepositSum] = useState('');
    const [tickerForStatisticDescription, setTickerForStatisticDescription] = useState();

    const [tickersNameForStatistic, setTickersNameForStatistic] = useState();
    const [tickersForStatistic, setTickersForStatistic] = useState();
    const [dateFromForStatistic2, setDateFromForStatistic2] = useState('');
    const [dateToForStatistic2, setDateToForStatistic2] = useState('');
    const [depositPeriodDays2, setDepositPeriodDays2] = useState('');
    const [depositSum2, setDepositSum2] = useState('');
    const [tickersForStatisticDescription, setTickersForStatisticDescription] = useState();

    const [randomTickers, setRandomTickers] = useState();
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [message3, setMessage3] = useState('');
    const [message4, setMessage4] = useState('');

    useEffect(() => {

        const pricesAll2 = JSON.parse(localStorage.getItem('pricesAll'));
        const tickerFirstName = localStorage.getItem('firstTickerName');
        const tickerSecondName = localStorage.getItem('secondTickerName');
        const tickerFirst = localStorage.getItem('firstTicker');
        const tickerSecond = localStorage.getItem('secondTicker');
        const descriptionAll2 = JSON.parse(localStorage.getItem('descriptionsAll'));

        if (pricesAll2 && descriptionAll2) {
            setAllPrices(pricesAll2);
            setAllDescriptions(descriptionAll2);
            const randomTickers1 = randomNum(pricesAll2);
            setRandomTickers(randomTickers1);
            if (tickerFirstName) {
                setFirstTickerName(tickerFirstName);
            }
            if (tickerFirst != 'undefined') {
                setFirstTicker(JSON.parse(tickerFirst));
            }
            if (tickerSecondName) {
                setSecondTickerName(tickerSecondName);
            }
            if (tickerSecond != 'undefined') {
                setSecondTicker(JSON.parse(tickerSecond));
            }
        } else {
            dispatch(fetchTickers());
            dispatch(fetchPrice());
            const randomTickers1 = randomNum(pricesAll2);
            setRandomTickers(randomTickers1);
        }

    }, [])


    // function successCorrelation() {
    //     if(document.getElementById("dateFrom").value==="" || document.getElementById("dateTo").value==="" ||
    //         document.getElementById("ticker1").value==="" || document.getElementById("ticker2").value==="" ||
    //         document.getElementById("depositPeriodDays")|| document.getElementById("depositSum")) {
    //         document.getElementById('correlationBtn').disabled = true;
    //     } else {
    //         document.getElementById('correlationBtn').disabled = false;
    //     }
    // }

    const handleChangeFirstTicker = (e) => {
        const firstTicker = e.target.value;
        localStorage.setItem('firstTickerName', firstTicker);
        setFirstTickerName(firstTicker);
    }

    const handleChangeSecondTicker = (e) => {
        const secondTicker = e.target.value;
        localStorage.setItem('secondTickerName', secondTicker);
        setSecondTickerName(secondTicker);
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

        if (firstTickerName == "" || secondTickerName == "" || dateFrom == "" || dateTo == "") {
            setMessage1("You have entered insufficient data")
        } else{
            dispatch(fetchCorrelation(firstTickerName, secondTickerName, dateFrom, dateTo));
            dispatch(fetchAllPricesFirstTicker(firstTickerName, dateFrom, dateTo));
            dispatch(fetchAllPricesSecondTicker(secondTickerName, dateFrom, dateTo));

            const tickerFirst2 = allPrices.map(item => item).filter(item => item.date.name === firstTickerName);
            localStorage.setItem('firstTicker', JSON.stringify(tickerFirst2[0]))
            setFirstTicker(tickerFirst2[0])
            const tickerFirstDescription2 = allDescriptions.map(item => item).filter(item => item.ticker === firstTickerName);
            localStorage.setItem('firstTickerDescription', JSON.stringify(tickerFirstDescription2[0]))
            setFirstTickerDescription(tickerFirstDescription2[0]);

            const tickerSecond2 = allPrices.map(item => item).filter(item => item.date.name === secondTickerName);
            localStorage.setItem('secondTicker', JSON.stringify(tickerSecond2[0]))
            setSecondTicker(tickerSecond2[0])

            const tickerSecondDescription2 = allDescriptions.map(item => item).filter(item => item.ticker === secondTickerName);
            localStorage.setItem('secondTickerDescription', JSON.stringify(tickerFirstDescription2[0]))
            setSecondTickerDescription(tickerSecondDescription2[0]);


        }
    }

    const handleChangeTicker = (e) => {
        const ticker1 = e.target.value;
        setTickerNameForStatistic(ticker1);
    }

    const handleClickStatistic = () => {
        if (tickerNameForStatistic == "" || dateFromForStatistic == "" || dateToForStatistic == "" || depositPeriodDays == "" || depositSum == "") {
            setMessage2("You have entered insufficient data")
        } else{
            const ticker1 = allPrices.map(item => item).filter(item => item.date.name === tickerNameForStatistic);
            setTickerForStatistic(ticker1[0]);
            const tickerDescription1 = allDescriptions.map(item => item).filter(item => item.ticker === tickerNameForStatistic);
            setTickerForStatisticDescription(tickerDescription1[0]);
            dispatch(fetchStatistic(tickerNameForStatistic, dateFromForStatistic, dateToForStatistic, depositPeriodDays, depositSum));
        }
    }

    const handleChangeTickers = (e) => {
        const tickers = e.target.value.trim().replaceAll(" ", "").split(",");
        setTickersNameForStatistic(tickers);
    }

    const handleClickStatisticForInvestmentPortfolio = () => {
        if (tickersNameForStatistic == "" || dateFromForStatistic2 == "" || dateToForStatistic2 == "" || depositPeriodDays2 == "" || depositSum2 == "") {
            setMessage3("You have entered insufficient data")
        } else {
            if (tickersNameForStatistic.length < 2) {
                console.log(tickerNameForStatistic.length)
                setMessage4("Count of tickers must be at least two.")
            }
            const tickers2 = [];
            const tickerDescriptions2 = [];

            for (let i = 0; i < tickersNameForStatistic.length; i++) {
                const ticker2 = allPrices.map(item => item).filter(item => item.date.name === tickersNameForStatistic[i]);
                tickers2.push(ticker2[0]);
                const tickerDescription2 = allDescriptions.map(item => item).filter(item => item.ticker === tickersNameForStatistic[i]);
                tickerDescriptions2.push(tickerDescription2[0]);
            }
            setTickersForStatistic(tickers2);
            setTickersForStatisticDescription(tickerDescriptions2);
            dispatch(fetchStatisticForInvestmentPortfolio(tickersNameForStatistic, dateFromForStatistic2, dateToForStatistic2, depositPeriodDays2, depositSum2));
        }
    }

    const CustomTooltip = ({payload}) => {
        if (payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="text">{`${payload[0].payload.date}`}</p>
                    <p className="text">{`${firstTickerName}: ${payload[0].payload.price}`}</p>
                    <p className="text">{`${secondTickerName}: ${payload[1].payload.price2}`}</p>
                </div>
            );
        }
    };

    const closeAlert1 = () => {
        setMessage1('');
    }
    const closeAlert2 = () => {
        setMessage2('');
    }
    const closeAlert3 = () => {
        setMessage3('');
    }
    const closeAlert4 = () => {
        setMessage4('');
    }

    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1>Analytics</h1>
                </div>
            </section>
            <section className="page-statistic d-flex">
                <div className="px-2 me-2 ms-4">
                    <div className={styleStat.stock__info__analytic}>
                        <h4 className="pb-1 px-3 mb-3 mx-5 text-uppercase">Calculation the correlation coefficient
                            between any two stocks, indexes
                            or anything else that can be tracked numerically.</h4>
                        <p className="pb-1 px-3 mb-1 mx-5">Correlation is the scaled version of covariance, which
                            measures whether variables are
                            positively or inversely related.</p>
                        <p className="pb-1 px-3 mx-5">Correlation is measured through the correlation coefficient. The
                            correlation coefficient always
                            returns a value between +1.0 (perfectly positively correlated) and -1.0 (perfectly
                            negatively
                            correlated); a correlation coefficient of zero has no predictive power and is of little use
                            to the
                            technical analyst.</p>
                    </div>
                    {message1 &&
                        <div className="alert alert-danger alert-dismissible mx-5 mt-5">
                            <button className="btn-close" onClick={closeAlert1}></button>
                            {message1}
                        </div>
                    }
                    <div className="page-statistic__main">
                        <div className="correlationPage__form" id="form">
                            <div className="input__container">
                                <label htmlFor="dateFrom">From</label>
                                <input type="date" id="dateFrom" className="text"
                                       onChange={handleChangeDateFrom}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <div className="input__container">
                                <label htmlFor="dateTo">To</label>
                                <input type="date" id="dateTo" className="text"
                                       onChange={handleChangeDateTo}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <div className="input__container">
                                <label htmlFor="stock">First stock</label>
                                <input type="text" id="ticker1" className="text"
                                       onChange={handleChangeFirstTicker}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <div className="input__container">
                                <label htmlFor="stock">Second stock</label>
                                <input type="text" id="ticker2" className="text"
                                       onChange={handleChangeSecondTicker}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <button type="submit" className="button form__button correlation__button"
                                    id="correlationBtn" onClick={handleClickCorrelation}>
                                Calculate
                            </button>
                        </div>
                        {/*{errorCorrelation ?*/}
                        {/*    <div id="errorCorrelation" className="alert alert-danger alert-dismissible mx-5 mt-5" >*/}
                        {/*        <button className="btn-close" onClick={closeErrorCorrelation}></button>*/}
                        {/*         {errorCorrelation}*/}
                        {/*     </div> :*/}
                        {/*        <>*/}
                                {textCorrelation == 'Pending' ? <div className='spinner-border text-primary'></div> :
                                    <>
                                        {correlation &&
                                            <>
                                                <div className="chart">
                                                    <LineChart width={1000} height={400}>
                                                        <defs>
                                                            <filter id="shadow">
                                                                <feDropShadow dx="0" dy="2" stdDeviation="3"/>
                                                            </filter>
                                                        </defs>
                                                        <XAxis dataKey="date" xAxisId={"price"}
                                                               interval={allPricesFirstTicker.length < 25 ? 3 :
                                                                   allPricesFirstTicker.length < 400 ? 30 : allPricesFirstTicker.length < 900 ? 100 : allPricesFirstTicker.length < 2000 ? 400 :
                                                                       allPricesFirstTicker.length < 2600 ? 700 : 1000}
                                                               axisLine={false}
                                                               tickFormatter={allPricesFirstTicker.length < 25 ? ((tickItem) => moment(tickItem).format("D MMM.")) :
                                                                   allPricesFirstTicker.length < 2600 ? ((tickItem) => moment(tickItem).format("MMM. YYYY")) :
                                                                       ((tickItem) => moment(tickItem).format("YYYY"))}
                                                        />
                                                        <XAxis dataKey="date2" hide={true} xAxisId={"price2"}
                                                               interval={allPricesSecondTicker.length < 25 ? 3 :
                                                                   allPricesSecondTicker.length < 400 ? 30 : allPricesFirstTicker.length < 900 ? 100 : allPricesFirstTicker.length < 2000 ? 400 :
                                                                       allPricesFirstTicker.length < 2600 ? 700 : 1000}
                                                               axisLine={false}
                                                               tickFormatter={allPricesSecondTicker.length < 25 ? ((tickItem) => moment(tickItem).format("D MMM.")) :
                                                                   allPricesSecondTicker.length < 2600 ? ((tickItem) => moment(tickItem).format("MMM. YYYY")) :
                                                                       ((tickItem) => moment(tickItem).format("YYYY"))}
                                                        />
                                                        <YAxis
                                                            label={{
                                                                value: `${firstTickerName} / $`,
                                                                offset: 15,
                                                                angle: -90,
                                                                position: 'insideLeft'
                                                            }}
                                                            dataKey="price" domain={['auto', 'auto']} yAxisId={"left"}/>
                                                        <YAxis
                                                            label={{
                                                                value: `${secondTickerName} / $`,
                                                                offset: 5,
                                                                angle: -90,
                                                                position: 'insideRight'
                                                            }}
                                                            dataKey="price2" domain={['auto', 'auto']} yAxisId={"right"}
                                                            orientation={"right"}>
                                                            <Label
                                                                value={`${correlation.substring(0, correlation.indexOf(":"))}`}
                                                                offset={-40}
                                                                position="bottom"/>
                                                        </YAxis>
                                                        <CartesianGrid strokeWidth="0.5"/>
                                                        <Tooltip content={<CustomTooltip/>}/>
                                                        {firstTickerName && secondTickerName &&
                                                            <Legend
                                                                payload={[
                                                                    {
                                                                        value: `${firstTickerName}`,
                                                                        type: "line",
                                                                        color: "#2727cb",
                                                                    },
                                                                    {
                                                                        value: `${secondTickerName}`,
                                                                        type: "line",
                                                                        color: "#ff8a34",
                                                                    },
                                                                ]}
                                                                verticalAlign="bottom" align={"center"} height={36} ic/>
                                                        }
                                                        <Line data={allPricesFirstTicker} xAxisId={"price"}
                                                              yAxisId={"left"}
                                                              type="monotone"
                                                              dataKey="price" stroke="#2727cb" dot={false}
                                                              filter="url(#shadow)"
                                                        />
                                                        <Line data={allPricesSecondTicker} xAxisId={"price2"}
                                                              yAxisId={"right"}
                                                              type="monotone" dataKey="price2" stroke="#ff8a34"
                                                              dot={false}
                                                              filter="url(#shadow)"
                                                        />
                                                    </LineChart>
                                                </div>
                                                <div className={styleStat.stock__info}>
                                                    <p className={styleStat.stock__name}>Correlation
                                                        between {firstTickerDescription.name} and {firstTickerDescription.name} is {correlation}</p>
                                                    <div className="tickers">
                                                        <div className="mx-4">
                                                            <p className={styleStat.stock__name}>{firstTickerDescription.name} ({firstTickerDescription.ticker})<span> - {firstTickerDescription.exchangeCode}</span>
                                                            </p>
                                                            <div className={styleStat.price__now}>
                                                                <span
                                                                    className={styleStat.prise__analytic}>{firstTicker.priceClose}</span>
                                                                <span
                                                                    className={firstTicker.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{firstTicker.change}</span>
                                                                <span
                                                                    className={firstTicker.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({firstTicker.changePersent})%</span>
                                                                <p>At
                                                                    close: {moment(firstTicker.date.date).format("D MMM. YYYY")}</p>
                                                            </div>
                                                            <p>High/low for 52 week: <span
                                                                className="fw-bold">{firstTicker.maxPrice} / {firstTicker.minPrice}</span>
                                                            </p>
                                                        </div>
                                                        <div className="mx-4">
                                                            <p className={styleStat.stock__name}>{secondTickerDescription.name} ({secondTickerDescription.ticker})<span> - {secondTickerDescription.exchangeCode}</span>
                                                            </p>
                                                            <div className={styleStat.price__now}>
                                                                <span
                                                                    className={styleStat.prise__analytic}>{secondTicker.priceClose}</span>
                                                                <span
                                                                    className={secondTicker.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{secondTicker.change}</span>
                                                                <span
                                                                    className={secondTicker.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({secondTicker.changePersent})%</span>
                                                                <p>At
                                                                    close: {moment(secondTicker.date.date).format("D MMM. YYYY")}</p>

                                                            </div>
                                                            <p>High/low for 52 week: <span
                                                                className="fw-bold">{secondTicker.maxPrice} / {secondTicker.minPrice}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </>
                                }
                        {/*    </>*/}
                        {/*}*/}
                        <h4 className="pb-1 px-3 mt-5 mb-3 mx-5">STATISTIC FOR ONE INDEX / ONE STOCK</h4>
                        {message2 &&
                            <div className="alert alert-danger alert-dismissible mx-5 mt-5 ">
                                <button className="btn-close" onClick={closeAlert2}></button>
                                {message2}
                            </div>
                        }
                        <div className="correlationPage__form" id="form">
                            <div className="input__container">
                                <label htmlFor="dateFrom">From</label>
                                <input type="date" id="dateFrom" className="text"
                                       onChange={(e) => setDateFromForStatistic(e.target.value)}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <div className="input__container">
                                <label htmlFor="dateTo">To</label>
                                <input type="date" id="dateTo" className="text"
                                       onChange={(e) => setDateToForStatistic(e.target.value)}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <div className="input__container">
                                <label htmlFor="stock">Stock</label>
                                <input type="text" id="stock" className="text"
                                       onChange={handleChangeTicker}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <div className="input__container">
                                <label htmlFor="stock">deposit period days</label>
                                <input type="number" className="text" id="depositPeriodDays"
                                       onChange={(e) => setDepositPeriodDays(e.target.value)}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <div className="input__container">
                                <label htmlFor="stock">deposit summa</label>
                                <input type="number" className="text" id="depositSum"
                                       onChange={(e) => setDepositSum(e.target.value)}
                                    // onInput={successCorrelation}
                                />
                            </div>
                            <button type="submit" className="button form__button correlation__button"
                                    id="statsBtn" onClick={handleClickStatistic}>
                                Calculate
                            </button>
                        </div>
                        {textStatistic == 'Pending' ? <div className='spinner-border text-primary'></div> :
                            <>
                                {tickerForStatistic &&
                                    <div className={styleStat.stock__info}>
                                        <div className="mx-3">
                                            <p className={styleStat.stock__name}>{tickerForStatisticDescription.name} ({tickerForStatisticDescription.ticker})<span> - {tickerForStatisticDescription.exchangeCode}</span>
                                            </p>
                                            <div className={styleStat.price__now}>
                                                <span className={styleStat.prise__analytic}>{tickerForStatistic.priceClose}</span>
                                                <span
                                                    className={tickerForStatistic.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{tickerForStatistic.change}</span>
                                                <span
                                                    className={tickerForStatistic.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({tickerForStatistic.changePersent})%</span>
                                                <p>At
                                                    close: {moment(tickerForStatistic.date.date).format("D MMM. YYYY")}</p>
                                            </div>
                                            <p>High/low for 52 week: <span
                                                className="fw-bold">{tickerForStatistic.maxPrice} / {tickerForStatistic.minPrice}</span>
                                            </p>
                                            <table className="table table-hover table-light table-statistic mt-3">
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
                                    </div>
                                }
                            </>
                        }
                        <h4 className="pb-1 px-3 mt-5 mb-3 mx-5">STATISTIC FOR INVESTMENT PORTFOLIO</h4>
                        {message3 &&
                            <div className="alert alert-danger alert-dismissible mx-5 mt-5 d-block">
                                <button className="btn-close" onClick={closeAlert3}></button>
                                {message3}
                            </div>
                        }
                        {message4 &&
                            <div className="alert alert-info alert-dismissible mx-5 mt-5">
                                <button className="btn-close" onClick={closeAlert4}></button>
                                {message4}
                            </div>
                        }
                        <div className="correlationPage__form" id="form">
                            <div className="input__container">
                                <label htmlFor="dateFrom">From</label>
                                <input type="date" id="dateFrom" className="text"
                                       onChange={(e) => setDateFromForStatistic2(e.target.value)}/>
                            </div>
                            <div className="input__container">
                                <label htmlFor="dateTo">To</label>
                                <input type="date" id="dateTo" className="text"
                                       onChange={(e) => setDateToForStatistic2(e.target.value)}/>
                            </div>
                            <div className="input__container">
                                <label htmlFor="stock">Stocks</label>
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
                        {textStatisticForInvestmentPortfolio == 'Pending' ?
                            <div className='spinner-border text-primary'></div> :
                            <>
                                {tickersForStatistic &&
                                    <div className={styleStat.stock__info}>
                                        <div className="tickers">
                                            {tickersForStatistic.map((t, i) =>
                                                <TickerForInvestmentPortfolio key={i} name={t.date.name}
                                                                              priceClose={t.priceClose}
                                                                              change={t.change}
                                                                              changePersent={t.changePersent}
                                                                              date={t.date.date}
                                                                              maxPrice={t.maxPrice}
                                                                              minPrice={t.minPrice}
                                                />
                                            )}
                                        </div>

                                        <table className="table table-hover table-light table-statistic mt-3 mx-3">
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
                                }
                            </>
                        }
                    </div>
                </div>
                <div className="px-2 ms-2 me-4">
                    <div className="page-statistic__sideBar">
                        <div className="page-statistic__table">
                            <h5>Today's Price Fluctuations</h5>
                            {text == 'Pending' ? <div className='spinner-border text-primary'></div> :
                                <table className="table table-hover table-light">
                                    <thead>
                                    <tr>
                                        <th className={styleStat.stock} scope="col">Symbol</th>
                                        <th className={styleStat.stock} scope="col">Last</th>
                                        <th className={styleStat.stock} scope="col">Change</th>
                                        <th className={styleStat.stock} scope="col">% Change</th>
                                    </tr>
                                    </thead>
                                    {randomTickers &&
                                        <tbody>
                                        <tr>
                                            <th className={styleStat.stock}
                                                scope="row">{randomTickers[0].date.name}</th>
                                            <td>{randomTickers[0].priceClose}</td>
                                            <td className={randomTickers[0].change < 0 ? styleStat.red : styleStat.green}>{randomTickers[0].change}</td>
                                            <td className={randomTickers[0].changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[0].changePersent})%</td>
                                        </tr>
                                        <tr>
                                            <th className={styleStat.stock}
                                                scope="row">{randomTickers[1].date.name}</th>
                                            <td>{randomTickers[1].priceClose}</td>
                                            <td className={randomTickers[1].change < 0 ? styleStat.red : styleStat.green}>{randomTickers[1].change}</td>
                                            <td className={randomTickers[1].changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[1].changePersent})%</td>
                                        </tr>
                                        <tr>
                                            <th className={styleStat.stock}
                                                scope="row">{randomTickers[2].date.name}</th>
                                            <td>{randomTickers[2].priceClose}</td>
                                            <td className={randomTickers[2].change < 0 ? styleStat.red : styleStat.green}>{randomTickers[2].change}</td>
                                            <td className={randomTickers[2].changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[2].changePersent})%</td>
                                        </tr>
                                        <tr>
                                            <th className={styleStat.stock}
                                                scope="row">{randomTickers[3]?.date.name}</th>
                                            <td>{randomTickers[3]?.priceClose}</td>
                                            <td className={randomTickers[3]?.change < 0 ? styleStat.red : styleStat.green}>{randomTickers[3]?.change}</td>
                                            <td className={randomTickers[3]?.changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[3]?.changePersent})%</td>
                                        </tr>
                                        </tbody>
                                    }
                                </table>}
                        </div>
                    </div>
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