import React, {useEffect, useState} from 'react';
import '../../CSS/analytics.css'
import '../../CSS/correlation.css'
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchPriceFirstTicker,
    fetchPriceForStatistic,
    fetchPriceForStatisticInvestmentPortfolio,
    fetchPriceSecondTicker
} from "../../actions/priceAction";
import {
    fetchMinMaxPriceFirstTicker,
    fetchMinMaxPriceSecondTicker,
    fetchMinMaxPriceTickerForStatistic
} from "../../actions/minMaxPriceAction";
import {fetchCorrelation} from "../../actions/correlationAction";
import {fetchStatistic, fetchStatisticForInvestmentPortfolio} from "../../actions/statisticAction";
import {CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment/moment";
import {
    fetchAllPricesFirstTicker,
    fetchAllPricesSecondTicker
} from "../../actions/allPricesForDiagramAction";
import {names} from "../../utils/constants";

const Analytics = () => {

    const {priceFirstTicker, priceSecondTicker, priceTickerForStatistic, priceTickerForStatisticInvestmentPortfolio} = useSelector(state => state.prices);
    const {minMaxPricesFirstTicker, minMaxPricesSecondTicker} = useSelector(state => state.minMaxPrice);
    const {correlation} = useSelector(state => state.correlation);
    const {statistic, statisticForInvestmentPortfolio} = useSelector(state => state.statisticInfo);
    const {allPricesFirstTicker, allPricesSecondTicker} = useSelector(state => state.allPricesForDiagram);
    const dispatch = useDispatch();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [firstTicker, setFirstTicker] = useState('');
    const [secondTicker, setSecondTicker] = useState('');

    const [ticker, setTicker] = useState('');
    const [dateFrom2, setDateFrom2] = useState('');
    const [dateTo2, setDateTo2] = useState('');
    const [depositPeriodDays, setDepositPeriodDays] = useState('');
    const [depositSum, setDepositSum] = useState('');

    const [tickers, setTickers] = useState('');
    const [dateFrom3, setDateFrom3] = useState('');
    const [dateTo3, setDateTo3] = useState('');
    const [depositPeriodDays2, setDepositPeriodDays2] = useState('');
    const [depositSum2, setDepositSum2] = useState('');

    const handleChangeFirstTicker = (e) => {
        const firstTicker = e.target.value;
        localStorage.setItem('firstTicker', firstTicker);
        setFirstTicker(firstTicker);
        dispatch(fetchPriceFirstTicker(firstTicker));
    }

    const handleChangeSecondTicker = (e) => {
        const secondTicker = e.target.value;
        localStorage.setItem('secondTicker', secondTicker);
        setSecondTicker(secondTicker);
        dispatch(fetchPriceSecondTicker(secondTicker));
    }

    useEffect(() => {
        if (localStorage.getItem('firstTicker')) {
            const firstTicker1 = localStorage.getItem('firstTicker');
            setFirstTicker(firstTicker1);
            dispatch(fetchPriceFirstTicker(firstTicker1));
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('secondTicker')) {
            const secondTicker1 = localStorage.getItem('secondTicker');
            setSecondTicker(secondTicker1);
            dispatch(fetchPriceSecondTicker(secondTicker1));
        }
    }, [])

    const handleClickCorrelation = () => {
        dispatch(fetchMinMaxPriceFirstTicker(firstTicker, dateFrom, dateTo));
        dispatch(fetchMinMaxPriceSecondTicker(secondTicker, dateFrom, dateTo));
        localStorage.setItem('minMaxPriceFirstTicker', minMaxPricesFirstTicker);
        localStorage.setItem('minMaxPriceSecondTicker', minMaxPricesSecondTicker);
        dispatch(fetchCorrelation(firstTicker, secondTicker, dateFrom, dateTo));
        localStorage.setItem('correlation', correlation);
        dispatch(fetchAllPricesFirstTicker(firstTicker, dateFrom, dateTo));
        dispatch(fetchAllPricesSecondTicker(secondTicker, dateFrom, dateTo));
    }

    const handleClickStatistic = () => {
        dispatch(fetchStatistic(ticker, dateFrom2, dateTo2, depositPeriodDays, depositSum));
        localStorage.setItem('statistic', statistic);
        dispatch(fetchPriceForStatistic(ticker));
    }

    const handleChangeTickers = (e) => {
        const tickers = e.target.value.trim().replaceAll(" ", "").split(",");
        // localStorage.setItem('ticker', ticker);
        setTickers(tickers);
    }

    const handleClickStatisticForInvestmentPortfolio = () => {
        dispatch(fetchStatisticForInvestmentPortfolio(tickers, dateFrom3, dateTo3, depositPeriodDays2, depositSum2));
        localStorage.setItem('statistic', statisticForInvestmentPortfolio);
        dispatch(fetchPriceForStatisticInvestmentPortfolio(tickers));
    }

    const CustomTooltip = ({payload}) => {
        if (payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="text">{`${payload[0].payload.date}`}</p>
                    <p className="text">{`${firstTicker}: ${payload[0].value}`}</p>
                    <p className="text">{`${secondTicker}: ${payload[1].value}`}</p>
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
                                   onChange={(e) => setDateFrom(e.target.value)}/>
                        </div>
                        <div className="input__container">
                            <label htmlFor="dateTo">To</label>
                            <input type="date" id="dateTo" className="text"
                                   onChange={(e) => setDateTo(e.target.value)}/>
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
                                <Label value={`${correlation.substring(0, correlation.indexOf(":"))}`} offset={-40} position="bottom"/>
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
                        <p className={styleStat.stock__name}>Correlation
                            between {names(firstTicker)} and {names(secondTicker)} is {correlation}</p>
                        <p>The correlation between historical prices or returns on {names(firstTicker)} and {names(secondTicker)} is
                            a relative statistical measure of the degree to which these equity instruments
                            tend to move together. The correlation coefficient measures the extent to which
                            returns on {names(secondTicker)} Class are associated (or correlated) with {names(firstTicker)}. Values
                            of the correlation coefficient range from -1 to +1, where. The correlation of
                            zero (0) is possible when the price movement of {names(firstTicker)} has no effect on the
                            direction of {names(secondTicker)} i.e., {names(secondTicker)} and {names(firstTicker)} go up and down completely
                            randomly.</p>
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
                                       onChange={(e) => setTicker(e.target.value)}/>
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
                            <h3 className={styleStat.stock__name}>{names(priceTickerForStatistic.name)}</h3>
                            <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                            <div className={styleStat.price__now}>
                                <span className={styleStat.prise}>{priceTickerForStatistic.price}</span>
                                <span
                                    className={priceTickerForStatistic.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{priceTickerForStatistic.change}</span>
                                <span
                                    className={priceTickerForStatistic.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({priceTickerForStatistic.changePersent})%</span>
                            </div>
                        <table className="table table-hover table-light table-statistic">
                            <tbody>
                            <tr>MINIMUM:</tr>
                            <tr>
                                <th>minPriceStart: </th>
                                <th>{statistic.minStat?.minPriceStart} ({statistic.minStat?.minDateStart}) </th>
                            </tr>
                            <tr>
                                <th>minDateEnd: </th>
                                <th>{statistic.minStat?.minPriceEnd} ({statistic.minStat?.minDateEnd}) </th>
                            </tr>
                            <tr>
                                <th>minPercentApy: </th>
                                <th>{statistic.minStat?.minPercentApy} </th>
                            </tr>
                            <tr>
                                <th>minRevenue: </th>
                                <th>{statistic.minStat?.minRevenue} </th>
                            </tr>
                            <tr>MAXIMUM:</tr>
                            <tr>
                                <th>maxDateStart: </th>
                                <th>{statistic.maxStat?.maxPriceStart} ({statistic.maxStat?.maxDateStart})</th>
                            </tr>
                            <tr>
                                <th>maxDateEnd: </th>
                                <th>{statistic.maxStat?.maxPriceEnd} ({statistic.maxStat?.maxDateEnd}) </th>
                            </tr>
                            <tr>
                                <th>maxPercentApy: </th>
                                <th>{statistic.maxStat?.maxPercentApy} </th>
                            </tr>
                            <tr>
                                <th>maxRevenue: </th>
                                <th>{statistic.maxStat?.maxRevenue} </th>
                            </tr>
                            <tr>AVERAGE:</tr>
                            <tr>
                                <th>avgPercent: </th>
                                <th>{statistic.avgPercent} </th>
                            </tr>
                            <tr>
                                <th>avgRevenue: </th>
                                <th>{statistic.avgRevenue} </th>
                            </tr>
                            </tbody>
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
                        <div className="tickers">
                            <div className="ticker">
                                <h3 className={styleStat.stock__name}>{names(priceTickerForStatisticInvestmentPortfolio[0]?.name)}</h3>
                                <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                                <div className={styleStat.price__now}>
                                    <span className={styleStat.prise}>{priceTickerForStatisticInvestmentPortfolio[0]?.price}</span>
                                    <span
                                        className={priceTickerForStatisticInvestmentPortfolio[0]?.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{priceTickerForStatisticInvestmentPortfolio[0]?.change}</span>
                                    <span
                                        className={priceTickerForStatisticInvestmentPortfolio[0]?.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({priceTickerForStatisticInvestmentPortfolio[0]?.changePersent})%</span>
                                </div>
                            </div>
                            <div className="ticker">
                                <h3 className={styleStat.stock__name}>{names(priceTickerForStatisticInvestmentPortfolio[1]?.name)}</h3>
                                <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                                <div className={styleStat.price__now}>
                                    <span className={styleStat.prise}>{priceTickerForStatisticInvestmentPortfolio[1]?.price}</span>
                                    <span
                                        className={priceTickerForStatisticInvestmentPortfolio[1]?.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{priceTickerForStatisticInvestmentPortfolio[1]?.change}</span>
                                    <span
                                        className={priceTickerForStatisticInvestmentPortfolio[1]?.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({priceTickerForStatisticInvestmentPortfolio[1]?.changePersent})%</span>
                                </div>
                            </div>
                            <div className="ticker">
                                <h3 className={styleStat.stock__name}>{names(priceTickerForStatisticInvestmentPortfolio[2]?.name)}</h3>
                                <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                                <div className={styleStat.price__now}>
                                    <span className={styleStat.prise}>{priceTickerForStatisticInvestmentPortfolio[2]?.price}</span>
                                    <span
                                        className={priceTickerForStatisticInvestmentPortfolio[2]?.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{priceTickerForStatisticInvestmentPortfolio[2]?.change}</span>
                                    <span
                                        className={priceTickerForStatisticInvestmentPortfolio[2]?.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({priceTickerForStatisticInvestmentPortfolio[2]?.changePersent})%</span>
                                </div>
                            </div>
                        </div>
                    <table className="table table-hover table-light table-statistic">
                        <tbody>
                        <tr>MINIMUM:</tr>
                        <tr>
                            <th>minPriceStart: </th>
                            <th>{statisticForInvestmentPortfolio.minStat?.minPriceStart} ({statisticForInvestmentPortfolio.minStat?.minDateStart}) </th>
                        </tr>
                        <tr>
                            <th>minDateEnd: </th>
                            <th>{statisticForInvestmentPortfolio.minStat?.minPriceEnd} ({statisticForInvestmentPortfolio.minStat?.minDateEnd}) </th>
                        </tr>
                        <tr>
                            <th>minPercentApy: </th>
                            <th>{statisticForInvestmentPortfolio.minStat?.minPercentApy} </th>
                        </tr>
                        <tr>
                            <th>minRevenue: </th>
                            <th>{statisticForInvestmentPortfolio.minStat?.minRevenue} </th>
                        </tr>
                        <tr>MAXIMUM:</tr>
                        <tr>
                            <th>maxDateStart: </th>
                            <th>{statisticForInvestmentPortfolio.maxStat?.maxPriceStart} ({statisticForInvestmentPortfolio.maxStat?.maxDateStart})</th>
                        </tr>
                        <tr>
                            <th>maxDateEnd: </th>
                            <th>{statisticForInvestmentPortfolio.maxStat?.maxPriceEnd} ({statisticForInvestmentPortfolio.maxStat?.maxDateEnd}) </th>
                        </tr>
                        <tr>
                            <th>maxPercentApy: </th>
                            <th>{statisticForInvestmentPortfolio.maxStat?.maxPercentApy} </th>
                        </tr>
                        <tr>
                            <th>maxRevenue: </th>
                            <th>{statisticForInvestmentPortfolio.maxStat?.maxRevenue} </th>
                        </tr>
                        <tr>AVERAGE:</tr>
                        <tr>
                            <th>avgPercent: </th>
                            <th>{statisticForInvestmentPortfolio.avgPercent} </th>
                        </tr>
                        <tr>
                            <th>avgRevenue: </th>
                            <th>{statisticForInvestmentPortfolio.avgRevenue} </th>
                        </tr>
                        </tbody>
                    </table>
                    {/*<div className="correlation__chart">*/}
                    {/*</div>*/}
                </div>
                </div>
                <div className="page-analytics__sideBar">
                    <div className={styleStat.stock__info}>
                        <h3 className={styleStat.stock__name}>{names(firstTicker)}</h3>
                        <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                        <div className={styleStat.price__now}>
                            <span className={styleStat.prise}>{priceFirstTicker.price}</span>
                            <span
                                className={priceFirstTicker.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{priceFirstTicker.change}</span>
                            <span
                                className={priceFirstTicker.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({priceFirstTicker.changePersent})%</span>
                        </div>
                        <p className="min_prise">Min.price: {minMaxPricesFirstTicker.min}</p>
                        <p className="min_prise">Max.price: {minMaxPricesFirstTicker.max}</p>
                    </div>

                    <div className={styleStat.stock__info}>
                        <h3 className={styleStat.stock__name}>{names(secondTicker)}</h3>
                        <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                        <div className={styleStat.price__now}>
                            <span className={styleStat.prise}>{priceSecondTicker.price}</span>
                            <span
                                className={priceSecondTicker.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{priceSecondTicker.change}</span>
                            <span
                                className={priceSecondTicker.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({priceSecondTicker.changePersent})%</span>

                            <p className="min_prise">Min.price: {minMaxPricesSecondTicker.min}</p>
                            <p className="min_prise">Max.price: {minMaxPricesSecondTicker.max}</p>
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