import React, {useEffect, useState} from 'react';
import '../../CSS/statistics.css'
import '../../CSS/analytics.css'
import styleStat from '../../CSS/stat.module.css'
import {useDispatch, useSelector} from "react-redux"
import {fetchTickers} from "../../actions/tickersAction";
import {fetchPrice, fetchPriceMainTicker} from "../../actions/priceAction";
import {fetchMinMaxPriceMainTicker, fetchMinMaxPriceMainTickerForPeriod} from "../../actions/minMaxPriceAction";
import {
    Area,
    AreaChart,
    CartesianGrid, Legend,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {fetchAllPricesMainTicker, fetchAllPricesMainTickerForFiveDays} from "../../actions/allPricesForDiagramAction";
import moment from 'moment';
import {dateStr, names, randomNum} from "../../utils/constants";
import navItem from "../Header/NavItem";

const Statistics = () => {
    const {tickers} = useSelector(state => state.tickers);
    const {text} = useSelector(state => state.prices);
    const {minMaxPricesMainTickerForPeriod} = useSelector(state => state.minMaxPrice);
    const {allPricesMainTicker} = useSelector(state => state.allPricesForDiagram);
    const dispatch = useDispatch();

    const [ticker, setTicker] = useState('');
    const [mainTicker, setMainTicker] = useState();
    const [randomTickers, setRandomTickers] = useState();
    const [allPrices, setAllPrices] = useState();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    // const [dateFromDiagram, setDateFromDiagram] = useState('');
    // const [dateNow, setDateNow] = useState('');

    useEffect(() => {
        const tickerName = localStorage.getItem('tickerName');
        const tickerMain = localStorage.getItem('mainTicker');
        const pricesAll = JSON.parse(localStorage.getItem('pricesAll'));
        setAllPrices(pricesAll);
        if (pricesAll) {
            if (tickerName || tickerMain) {
                setTicker(tickerName);
                setMainTicker(tickerMain);
                dispatch(fetchAllPricesMainTickerForFiveDays(ticker));
            }
            const ticker2 = pricesAll.map(item => item).filter(item => item.name === tickerName);
            localStorage.setItem('mainTicker', JSON.stringify(ticker2[0]))
            setMainTicker(ticker2[0]);
        }
        dispatch(fetchPrice());
        dispatch(fetchTickers());
        const randomTickers1 = randomNum(pricesAll);
        randomTickers1.splice(randomTickers1.findIndex(t=> t.name === ticker), 1);
        setRandomTickers(randomTickers1);
    }, [tickers[0]]);

    const handleChange = (e) => {
        const ticker = e.target.value;
        localStorage.setItem('tickerName',ticker)
        setTicker(ticker);

        const ticker2 = allPrices.map(item => item).filter(item => item.name === ticker);
        localStorage.setItem('mainTicker', JSON.stringify(ticker2[0]))
        setMainTicker(ticker2[0]);

        const randomTickers1 = randomNum(allPrices);
        randomTickers1.splice(randomTickers1.findIndex(t=> t.name === ticker), 1);
        setRandomTickers(randomTickers1);
        dispatch(fetchAllPricesMainTickerForFiveDays(ticker));
    }

    const handleClickStatistic = () => {
        dispatch(fetchAllPricesMainTicker(ticker, dateFrom, dateTo));
        dispatch(fetchMinMaxPriceMainTickerForPeriod(ticker, dateFrom, dateTo));
    }

    const func = (count) => {
        const dateTo = new Date("2023-04-20");
        let dateFrom;
        if (count) {
            dateFrom = new Date(dateTo - count);
        } else {
            dateFrom = new Date("1978-01-01");
        }

        const dateToStr = dateStr(dateTo);
        const dateFromStr = dateStr(dateFrom);
        dispatch(fetchAllPricesMainTicker(ticker, dateFromStr, dateToStr));
        dispatch(fetchMinMaxPriceMainTickerForPeriod(ticker, dateFromStr, dateToStr));
    }

    const handleClickFiveDays = () => {
        const count = 1000 * 60 * 60 * 24 * 5;
        func(count);
    }

    const handleClickMonth = () => {
        const count = 1000 * 60 * 60 * 24 * 30;
        func(count);
    }

    const handleClickSixMonth = () => {
        const count = 1000 * 60 * 60 * 24 * 180;
        func(count);
    }

    const handleClickYear = () => {
        const count = 1000 * 60 * 60 * 24 * 365;
        func(count);
    }

    const handleClickFiveYears = () => {
        const count = 1000 * 60 * 60 * 24 * (365 * 5);
        func(count);
    }

    const handleClickMax = () => {
        func();
    }

    const CustomTooltip = ({payload}) => {
        if (payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="text">{`${payload[0].payload.date}`}</p>
                    <p className="text">{`${ticker}: ${payload[0].value}`}</p>
                </div>
            );
        }
    };

    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1 className="page__title">Statistics</h1></div>
            </section>

            <section className="page-statistic">
                <section className="page-statistic__main">
                    <button className="btnPeriod ps-5"
                            onClick={handleClickFiveDays}>5DAYS <span className={"px-2"}> | </span>
                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickMonth}> 1MONTH <span className={"px-2"}> | </span>
                    </button>
                    <button className="btnPeriod "
                            onClick={handleClickSixMonth}> 6MONTH <span className={"px-2"}> | </span>
                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickYear}> 1YEAR <span className={"px-2"}> | </span>
                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickFiveYears}> 5YEARS <span className={"px-2"}> | </span>
                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickMax}> MAX.
                    </button>
                    <AreaChart width={860} height={350} margin={{top: 20, right: 5, bottom: 5}}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff8a34" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ff8a34" stopOpacity={0}/>

                            </linearGradient>
                        </defs>
                        <Area data={allPricesMainTicker} dataKey="price" xAxisId={"price"} stroke="#ff8a34" dot={false}
                              fillOpacity={1} fill="url(#colorPrice)" style={{filter: `drop-shadow(0px 3px 2px )`}}
                        />
                        <XAxis dataKey="date" xAxisId={"price"} interval={allPricesMainTicker.length < 6 ? 0 :
                            allPricesMainTicker.length < 25 ? 3 : allPricesMainTicker.length < 400 ? 30 :
                                allPricesMainTicker.length < 900 ? 100 : allPricesMainTicker.length < 2000 ? 400 :
                                    allPricesMainTicker.length < 2600 ? 700 : 1000} axisLine={false}
                               tickFormatter={allPricesMainTicker.length < 25 ? ((tickItem) => moment(tickItem).format("D MMM.")) :
                                   allPricesMainTicker.length < 2600 ? ((tickItem) => moment(tickItem).format("MMM. YYYY")) :
                                       ((tickItem) => moment(tickItem).format("YYYY"))}
                        />
                        <YAxis
                            label={{
                                value: `${ticker} / $`, offset: 20, angle: -90, position: 'insideLeft'
                            }}
                            dataKey="price" domain={['auto', 'auto']} interval="preserveStartEnd"
                        />
                        <CartesianGrid vertical={false} strokeWidth="0.5"/>
                        <Tooltip content={<CustomTooltip/>}/>
                        {ticker &&
                        <Legend
                            payload={[
                                {
                                    value: `${ticker}`,
                                    type: "line",
                                    color: "#ff8a34",
                                },
                            ]}
                            verticalAlign="bottom" align={"center"} height={36} ic/>
                        }
                    </AreaChart>
                </section>
                <section className="page-statistic__sideBar">
                    <div className={styleStat.stock__info}>
                        <select className="form-select" onChange={handleChange} value={ticker}>
                            <option value='' disabled hidden>Select ticker</option>
                            {tickers.map((t) => {
                                    return <option key={t} value={t}>{t}</option>
                                }
                            )}
                        </select>
                        {mainTicker &&
                            <>
                        <h3 className={styleStat.stock__name}>{names(mainTicker.name)}</h3>
                        <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                                <div className={styleStat.price__now}>
                                    <span className={styleStat.prise}>{mainTicker.price}</span>
                                    <span
                                        className={mainTicker.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.change}</span>
                                    <span
                                        className={mainTicker.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({mainTicker.changePersent})%</span>
                                </div>
                                <p>High/low for 52 week</p>
                                <p className="fw-bold">{mainTicker.max} / {mainTicker.min}</p>
                            </>
                        }
                        <div className="period">
                            <div className="date__container">
                                <div className="input__container">
                                    <label htmlFor="dateFrom1">From</label>
                                    <input type="date" id="dateFrom1" className="text"
                                           onChange={(e) => setDateFrom(e.target.value)}/>
                                </div>
                                <div className="input__container">
                                    <label htmlFor="dateTo1">To</label>
                                    <input type="date" id="dateTo1" className="text"
                                           onChange={(e) => setDateTo(e.target.value)}/>
                                </div>
                            </div>
                            <button type="submit" className="button form__button" id="statsBtn"
                                    onClick={handleClickStatistic}>VIEW STATISTIC
                            </button>
                        </div>
                        {minMaxPricesMainTickerForPeriod.max &&
                            <div>
                                <p>High/low for period: </p>
                                <p className="fw-bold">{minMaxPricesMainTickerForPeriod.max} / {minMaxPricesMainTickerForPeriod.min}</p>
                            </div>
                        }

                    </div>

                    <div className="page-statistic__table">
                        <h5>Today's Price Fluctuations</h5>
                        {text == 'Pending'
                            ?
                            <div className='spinner-border text-primary'></div>
                            :
                            <table className="table table-hover table-light">
                                <thead>
                                <tr>
                                    <th className={styleStat.stock} scope="col">Stocks</th>
                                    <th className={styleStat.stock} scope="col">Last</th>
                                    <th className={styleStat.stock} scope="col">Change</th>
                                    <th className={styleStat.stock} scope="col">% Change</th>
                                </tr>
                                </thead>
                                {randomTickers &&
                                    <tbody>
                                    <tr>
                                        <th className={styleStat.stock} scope="row">{randomTickers[0].name}</th>
                                        <td>{randomTickers[0].price}</td>
                                        <td className={randomTickers[0].change < 0 ? styleStat.red : styleStat.green}>{randomTickers[0].change}</td>
                                        <td className={randomTickers[0].changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[0].changePersent})%</td>
                                    </tr>
                                    <tr>
                                        <th className={styleStat.stock} scope="row">{randomTickers[1].name}</th>
                                        <td>{randomTickers[1].price}</td>
                                        <td className={randomTickers[1].change < 0 ? styleStat.red : styleStat.green}>{randomTickers[1].change}</td>
                                        <td className={randomTickers[1].changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[1].changePersent})%</td>
                                    </tr>
                                    <tr>
                                        <th className={styleStat.stock} scope="row">{randomTickers[2].name}</th>
                                        <td>{randomTickers[2].price}</td>
                                        <td className={randomTickers[2].change < 0 ? styleStat.red : styleStat.green}>{randomTickers[2].change}</td>
                                        <td className={randomTickers[2].changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[2].changePersent})%</td>
                                    </tr>
                                    <tr>
                                        <th className={styleStat.stock} scope="row">{randomTickers[3].name}</th>
                                        <td>{randomTickers[3].price}</td>
                                        <td className={randomTickers[3].change < 0 ? styleStat.red : styleStat.green}>{randomTickers[3].change}</td>
                                        <td className={randomTickers[3].changePersent < 0 ? styleStat.red : styleStat.green}>({randomTickers[3].changePersent})%</td>
                                    </tr>
                                    </tbody>
                                }
                            </table>
                        }
                    </div>
                </section>
            </section>
        </>
    );
};

export default Statistics;