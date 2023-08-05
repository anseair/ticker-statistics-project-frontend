import React, {useEffect, useState} from 'react';
import '../../CSS/statistics.css'
import '../../CSS/analytics.css'
import styleStat from '../../CSS/stat.module.css'
import {useDispatch, useSelector} from "react-redux"
import {fetchDescription, fetchTickers} from "../../actions/tickersAction";
import {fetchPrice} from "../../actions/priceAction";
import {
    Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis
} from "recharts";
import {fetchAllPricesMainTicker, fetchAllPricesMainTickerForFiveDays} from "../../actions/allPricesForDiagramAction";
import moment from 'moment';
import {dateStr, names, navItems, randomNum} from "../../utils/constants";
import navItem from "../Header/NavItem";
import {FaSearch} from 'react-icons/fa';

const Statistics = () => {
    const {tickers} = useSelector(state => state.tickers);
    const {text} = useSelector(state => state.prices);
    const {allPricesMainTicker} = useSelector(state => state.allPricesForDiagram);
    const dispatch = useDispatch();

    const [ticker, setTicker] = useState('');
    const [mainTicker, setMainTicker] = useState();
    const [mainTickerDescription, setMainTickerDescription] = useState();
    const [randomTickers, setRandomTickers] = useState();
    const [allPrices, setAllPrices] = useState();
    const [allDescriptions, setAllDescriptions] = useState();

    useEffect(() => {
        const tickerName = localStorage.getItem('tickerName');
        const tickerMain = JSON.parse(localStorage.getItem('mainTicker'));
        const pricesAll2 = JSON.parse(localStorage.getItem('pricesAll'));
        const descriptionAll2 = JSON.parse(localStorage.getItem('descriptionsAll'));
        const tickerMainDescription = JSON.parse(localStorage.getItem('mainTickerDescription'));
        if (pricesAll2 && descriptionAll2) {
            setAllPrices(pricesAll2);
            setAllDescriptions(descriptionAll2);
            const randomTickers1 = randomNum(pricesAll2);
            randomTickers1.splice(randomTickers1.findIndex(t => t.date.name === tickerName), 1);
            setRandomTickers(randomTickers1);
            if (tickerName && tickerMain && tickerMainDescription) {
                setTicker(tickerName);
                setMainTicker(tickerMain);
                setMainTickerDescription(tickerMainDescription);
                dispatch(fetchAllPricesMainTickerForFiveDays(tickerName));
            } else{
                const ticker2 = pricesAll2.map(item => item).filter(item => item.date.name === ticker);
                localStorage.setItem('mainTicker', JSON.stringify(ticker2[0]))
                setTicker(tickerName);
                setMainTicker(ticker2[0]);
                dispatch(fetchAllPricesMainTickerForFiveDays(tickerName));
                const description2 = descriptionAll2.map(item => item).filter(item => item.ticker === ticker);
                localStorage.setItem('mainTickerDescription', JSON.stringify(description2[0]))
                setMainTickerDescription(description2[0]);
            }
        } else {
            console.log("===========")
            dispatch(fetchTickers());
            dispatch(fetchPrice());
            dispatch(fetchDescription());
            const randomTickers1 = randomNum(pricesAll2);
            randomTickers1.splice(randomTickers1.findIndex(t => t.date.name === tickerName), 1);
            setRandomTickers(randomTickers1);
            dispatch(fetchAllPricesMainTickerForFiveDays(tickerName));
        }
    }, [tickers[0]]);

    const handleChange = (e) => {
        const ticker = e.target.value;
        localStorage.setItem('tickerName', ticker)
        setTicker(ticker);

        const ticker2 = allPrices.map(item => item).filter(item => item.date.name === ticker);
        localStorage.setItem('mainTicker', JSON.stringify(ticker2[0]))
        setMainTicker(ticker2[0]);

        const description2 = allDescriptions.map(item => item).filter(item => item.ticker === ticker);
        localStorage.setItem('mainTickerDescription', JSON.stringify(description2[0]))
        setMainTickerDescription(description2[0]);

        const randomTickers1 = randomNum(allPrices);
        randomTickers1.splice(randomTickers1.findIndex(t => t.date.name === ticker), 1);
        setRandomTickers(randomTickers1);
        dispatch(fetchAllPricesMainTickerForFiveDays(ticker));
        dispatch(fetchDescription(ticker));
    }

    // const handleClickStatistic = () => {
    //     dispatch(fetchAllPricesMainTicker(ticker, dateFrom, dateTo));
    //     // dispatch(fetchMinMaxPriceMainTickerForPeriod(ticker, dateFrom, dateTo));
    // }

    const func = (count) => {
        const dateTo = new Date();
        console.log(dateTo)
        let dateFrom;
        if (count) {
            dateFrom = new Date(dateTo - count);
            console.log(dateFrom)
        } else {
            dateFrom = new Date("2000-01-01");
        }

        const dateToStr = dateStr(dateTo);
        const dateFromStr = dateStr(dateFrom);
        dispatch(fetchAllPricesMainTicker(ticker, dateFromStr, dateToStr));
        // dispatch(fetchMinMaxPriceMainTickerForPeriod(ticker, dateFromStr, dateToStr));
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
            return (<div className="custom-tooltip">
                <p className="text">{`${payload[0].payload.date}`}</p>
                <p className="text">{`${ticker}: ${payload[0].value}`}</p>
            </div>);
        }
    };

    const toggleText = () => {
        let dots =
            document.getElementById("dots");
        let showMoreText =
            document.getElementById("moreText");
        let buttonText =
            document.getElementById("textButton");
        if (dots.style.display === "none") {
            dots.style.display = "inline";
            buttonText.innerHTML = "Show more";
            showMoreText.style.display = "none";
        } else {
            dots.style.display = "none";
            buttonText.innerHTML = "Show less";
            showMoreText.style.display = "inline";
        }
    }

    return (<>
        <section className="page__header">
            <div className="page__container">
                <h1 className="page__title">Statistics</h1></div>
        </section>
        <section className="page-statistic d-flex">
            <div className="px-2 me-2 ms-4">
                <div className={styleStat.stock__info__statistic}>
                    <div className="d-flex">
                        <FaSearch className="m-2"/>
                        <select className="form-select" onChange={handleChange} value={ticker}>
                            <option value='' disabled hidden>Select ticker</option>
                            {tickers.map((t) => {
                                return <option key={t} value={t}>{t}</option>
                            })}
                        </select>
                    </div>
                    {mainTicker &&
                        <>
                            <p className={styleStat.stock__name}>{mainTickerDescription.name}<span> - {mainTickerDescription.exchangeCode}</span>
                            </p>
                            <div className={styleStat.price__now}>
                                <span className={styleStat.prise}>{mainTicker.priceClose}</span><span>USD</span>
                                <span
                                    className={mainTicker.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.change}</span>
                                <span
                                    className={mainTicker.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({mainTicker.changePersent})%</span>
                                <p>Last update at: {moment(mainTicker.date.date).format("D MMM. YYYY")}</p>
                            </div>

                        </>
                    }
                </div>
                {/*<div className="period">*/}
                {/*    <div className="date__container">*/}
                {/*        <div className="input__container">*/}
                {/*            <label htmlFor="dateFrom1">From</label>*/}
                {/*            <input type="date" id="dateFrom1" className="text"*/}
                {/*                   onChange={(e) => setDateFrom(e.target.value)}/>*/}
                {/*        </div>*/}
                {/*        <div className="input__container">*/}
                {/*            <label htmlFor="dateTo1">To</label>*/}
                {/*            <input type="date" id="dateTo1" className="text"*/}
                {/*                   onChange={(e) => setDateTo(e.target.value)}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <button type="submit" className="button form__button" id="statsBtn"*/}
                {/*            onClick={handleClickStatistic}>VIEW STATISTIC*/}
                {/*    </button>*/}
                {/*</div>*/}
                {/*{minMaxPricesMainTickerForPeriod.max &&*/}
                {/*    <div>*/}
                {/*        <p>High/low for period: </p>*/}
                {/*        <p className="fw-bold">{minMaxPricesMainTickerForPeriod.max} / {minMaxPricesMainTickerForPeriod.min}</p>*/}
                {/*    </div>*/}
                {/*}*/}
                <div className="page-statistic__main ">
                    {mainTicker &&
                        <>
                    <button className="btnPeriod ps-5 "
                            onClick={handleClickFiveDays}>5 DAYS
                        <p className={mainTicker.changePersent5Days < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.changePersent5Days}%</p>
                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickMonth}> 1 MONTH
                        {/*<span className={"px-2"}> | </span>*/}
                        <p className={mainTicker.changePersentMonth < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.changePersentMonth}%</p>

                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickSixMonth}> 6 MONTHS
                        <p className={mainTicker.changePersent6Months < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.changePersent6Months}%</p>

                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickYear}> 1 YEAR
                        <p className={mainTicker.changePersent1Year < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.changePersent1Year}%</p>

                    </button>
                    <button className="btnPeriod"
                            onClick={handleClickFiveYears}> 5 YEARS
                        <p className={mainTicker.changePersent5Years < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.changePersent5Years}%</p>

                    </button>
                    <button className="btnPeriod "
                            onClick={handleClickMax}> ALL TIME
                        <p className={mainTicker.changePersentAllTime < 0 ? styleStat.chgRed : styleStat.chgGreen}>{mainTicker.changePersentAllTime}%</p>

                    </button>
                    </>
                    }
                    <AreaChart width={1010} height={400}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff8a34" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ff8a34" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area data={allPricesMainTicker} dataKey="price" xAxisId={"price"} stroke="#ff8a34" dot={false}
                              fillOpacity={1} fill="url(#colorPrice)" style={{filter: `drop-shadow(0px 3px 2px )`}}
                        />
                        <XAxis dataKey="date" xAxisId={"price"}
                               interval={allPricesMainTicker.length < 6 ? 0 : allPricesMainTicker.length < 25 ? 3 : allPricesMainTicker.length < 400 ? 30 : allPricesMainTicker.length < 900 ? 100 : allPricesMainTicker.length < 2000 ? 400 : allPricesMainTicker.length < 2600 ? 700 : 1000}
                               axisLine={false}
                               tickFormatter={allPricesMainTicker.length < 25 ? ((tickItem) => moment(tickItem).format("D MMM.")) : allPricesMainTicker.length < 2600 ? ((tickItem) => moment(tickItem).format("MMM. YYYY")) : ((tickItem) => moment(tickItem).format("YYYY"))}
                        />
                        <YAxis
                            label={{
                                value: `${ticker} / $`, offset: 10, angle: -90, position: 'insideLeft'
                            }}
                            dataKey="price" domain={['auto', 'auto']} interval="preserveStartEnd" orientation="left"
                        />
                        <CartesianGrid vertical={false} strokeWidth="0.5"/>
                        <Tooltip content={<CustomTooltip/>}/>
                        {ticker && <Legend
                            payload={[{
                                value: `${ticker}`, type: "line", color: "#ff8a34",
                            },]}
                            verticalAlign="bottom" align={"center"} height={36} ic/>}
                    </AreaChart>
                </div>
                <div className={styleStat.stock__info__statistic}>
                    {mainTickerDescription &&
                        <>
                            <h2 className={styleStat.stock__name}>About {mainTickerDescription.name}</h2>
                            <p>Start date: {mainTickerDescription.startDate}</p>
                            <p>High/low for 52 week: <span
                                className="fw-bold">{mainTicker.maxPrice} / {mainTicker.minPrice}</span></p>
                            <p>
                                {(mainTickerDescription.description).substring(0, ((mainTickerDescription.description).indexOf('.', 100)))}.
                                <span id="dots"> </span>
                                <span id="moreText">
                                        {(mainTickerDescription.description)
                                            .substring(((mainTickerDescription.description).indexOf('.', 100) + 1), ((mainTickerDescription.description).length-1))}.
                                </span>
                                <button className="btnShow" onClick={toggleText} id="textButton">
                                    Show more
                                </button>
                            </p>
                        </>
                    }
                </div>
            </div>
            <div className="px-2 ms-2 me-4">
                <div className="page-statistic__sideBar ">
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
    </>);
};

export default Statistics;