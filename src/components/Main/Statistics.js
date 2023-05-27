import React, {useEffect, useState} from 'react';
import '../../CSS/statistics.css'
import '../../CSS/analytics.css'
import styleStat from '../../CSS/stat.module.css'
import {useDispatch, useSelector} from "react-redux"
import {fetchTickers} from "../../actions/tickersAction";
import {fetchPrice, fetchPriceMainTicker} from "../../actions/priceAction";
import {fetchMinMaxPriceMainTicker} from "../../actions/minMaxPriceAction";
import {
    Area,
    AreaChart,
    CartesianGrid, Legend,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {fetchAllPricesMainTicker} from "../../actions/allPricesForDiagramAction";
import moment from 'moment';
import {names} from "../../utils/constants";

const Statistics = () => {
    const {tickers} = useSelector(state => state.tickers);
    const {priceMainTicker, pricesAll} = useSelector(state => state.prices);
    const {minMaxPricesMainTicker, minMaxPricesPeriod} = useSelector(state => state.minMaxPrice);
    const {allPricesMainTicker} = useSelector(state => state.allPricesForDiagram);
    const dispatch = useDispatch();

    const [ticker, setTicker] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateNow, setDateNow] = useState('');
    const [dateFromMonth, setDateFromMonth] = useState('');

    useEffect(() => {
        if(localStorage.getItem('mainTicker')){
        const ticker1 = localStorage.getItem('mainTicker');
        setTicker(ticker1);
        dispatch(fetchPriceMainTicker(ticker1));
    };
        dispatch(fetchTickers());
        dispatch(fetchPrice(tickers));
    }, []);

    const handleChange = (e) => {
        const ticker = e.target.value;
        localStorage.setItem('mainTicker', ticker)
        setTicker(ticker);
        dispatch(fetchPriceMainTicker(ticker));
    }

    const handleClickMinMax = () => {
        dispatch(fetchMinMaxPriceMainTicker(ticker, dateFrom, dateTo));
        localStorage.setItem('minMaxPricesMainTicker', minMaxPricesMainTicker);
    }

    const func = (count) => {
        const current = new Date("2023-04-20");
        let year = current.getFullYear();
        let day = '' + current.getDate();
        let month = '' + (current.getMonth()+1);
        if (day.length < 2 ){
            day = '0' + day;
        }
        if (month.length < 2){
            month = '0' + month;
        }
        console.log(current.toLocaleString())
        setDateNow(`${year}-${month}-${day}`);
        console.log(dateNow);
        let current2 ;
        if (count){
            current2 = new Date(current.setTime(current.getTime()-count));
        } else{
            current2 = new Date("1978-01-01");
        }
        console.log(current2.toLocaleString());
        let month2 = '' + (current2.getMonth()+1);
        let day2 = '' + current2.getDate();
        let year2 = current2.getFullYear();
        if (month2.length < 2){
            month2 = '0' + month2;
        }
        if (day2.length < 2){
            day2 = '0' + day2;
        }
        setDateFromMonth(`${year2}-${month2}-${day2}`);
        console.log(dateFromMonth);
        dispatch(fetchAllPricesMainTicker(ticker, dateFromMonth, dateNow));
        console.log(minMaxPricesPeriod);
    }

    const handleClickMonth = () => {
        const count = 1000*60*60*24*30;
        func(count);
    }

    const handleClickSixMonth = () => {
        const count = 1000*60*60*24*180;
        func(count);
    }

    const handleClickYear = () => {
        const count = 1000*60*60*24*365;
        func(count);
    }

    const handleClickFiveYears = () => {
        const count = 1000*60*60*24*(365*5);
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
                    <button type="submit" className="btnPeriod ps-5"
                             onClick={handleClickMonth}>1MONTH <span className={"px-2"}> | </span>
                    </button>

                    <button type="submit" className="btnPeriod "
                             onClick={handleClickSixMonth}> 6MONTH <span className={"px-2"}> | </span>
                    </button>
                    <button type="submit" className="btnPeriod"
                             onClick={handleClickYear}> 1YEAR <span className={"px-2"}> | </span>
                    </button>
                    <button type="submit" className="btnPeriod"
                            onClick={handleClickFiveYears}> 5YEARS <span className={"px-2"}> | </span>
                    </button>
                    <button type="submit" className="btnPeriod"
                            onClick={handleClickMax}> MAX.
                    </button>
                    <AreaChart width={860} height={350} margin={{top: 20, right: 5, bottom: 5}} >
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff8a34" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ff8a34" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" xAxisId={"price"} interval={allPricesMainTicker.length < 25 ? 3 :
                            allPricesMainTicker.length < 400 ? 30 : allPricesMainTicker.length < 900 ? 100 : allPricesMainTicker.length < 2000 ? 400 :
                                allPricesMainTicker.length < 2600 ? 700 : 1000} axisLine={false}
                               tickFormatter={allPricesMainTicker.length < 25 ? ((tickItem) => moment(tickItem).format("D MMM.")) :
                                   allPricesMainTicker.length < 2600 ? ((tickItem) => moment(tickItem).format("MMM. YYYY")) :
                                       ((tickItem) => moment(tickItem).format("YYYY")) }
                        />
                        <YAxis
                            label={{
                                value: `${ticker} / $`, offset: 20, angle: -90, position: 'insideLeft'
                            }}
                        dataKey="price" domain={['auto', 'auto']} interval="preserveStartEnd"
                        />
                        <CartesianGrid vertical={false} strokeWidth="0.5" />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Legend
                            payload={[
                                {
                                    value: `${ticker}`,
                                    type: "line",
                                    color: "#ff8a34",
                                },
                            ]}
                            verticalAlign="bottom" align={"center"} height={36} ic/>
                        <Area data={allPricesMainTicker} dataKey="price" xAxisId={"price"} stroke="#ff8a34" dot={false}
                              fillOpacity={1} fill="url(#colorPrice)" style={{filter: `drop-shadow(0px 3px 2px )`}}/>
                    </AreaChart>
                </section>
                <section className="page-statistic__sideBar">
                    <div className={styleStat.stock__info}>
                        <select className="form-select"  onChange={handleChange} value={ticker}>
                            <option value='' disabled hidden>Select ticker</option>
                            {tickers.map((text) => {
                                return <option key={text} value={text}>{text}</option>
                                }
                            )}
                        </select>
                        <h3 className={styleStat.stock__name}>{names(ticker)}</h3>
                            <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                        <div className={styleStat.price__now}>
                            <span className={styleStat.prise}>{priceMainTicker.price}</span>
                            <span className={priceMainTicker.change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{priceMainTicker.change}</span>
                            <span className={priceMainTicker.changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({priceMainTicker.changePersent})%</span>
                        </div>
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
                                    onClick={handleClickMinMax}>VIEW STATISTIC</button>
                        </div>
                        <p className="min_prise">Min.price: {minMaxPricesMainTicker.min}</p>
                        <p className="min_prise">Max.price: {minMaxPricesMainTicker.max}</p>
                    </div>
                    <div className="page-statistic__table">
                        <h5>Today's Price Fluctuations</h5>
                        <table className="table table-hover table-light">
                            <thead>
                            <tr>
                                <th className={styleStat.stock} scope="col">Stocks</th>
                                <th className={styleStat.stock} scope="col">Last</th>
                                <th className={styleStat.stock} scope="col">Change</th>
                                <th className={styleStat.stock} scope="col">% Change</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th className={styleStat.stock} scope="row">{pricesAll[0]?.name}</th>
                                <td>{pricesAll[0]?.price}</td>
                                <td className={pricesAll[0]?.change < 0 ? styleStat.red : styleStat.green}>{pricesAll[0]?.change}</td>
                                <td className={pricesAll[0]?.changePersent < 0 ? styleStat.red :  styleStat.green}>({pricesAll[0]?.changePersent})%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">{pricesAll[1]?.name}</th>
                                <td>{pricesAll[1]?.price}</td>
                                <td className={pricesAll[1]?.change < 0 ? styleStat.red : styleStat.green}>{pricesAll[1]?.change}</td>
                                <td className={pricesAll[1]?.changePersent < 0 ? styleStat.red :  styleStat.green}>({pricesAll[1]?.changePersent})%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">{pricesAll[2]?.name}</th>
                                <td>{pricesAll[2]?.price}</td>
                                <td className={pricesAll[2]?.change < 0 ? styleStat.red : styleStat.green}>{pricesAll[2]?.change}</td>
                                <td className={pricesAll[2]?.changePersent < 0 ? styleStat.red :  styleStat.green}>({pricesAll[2]?.changePersent})%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">{pricesAll[3]?.name}</th>
                                <td>{pricesAll[3]?.price}</td>
                                <td className={pricesAll[3]?.change < 0 ? styleStat.red : styleStat.green}>{pricesAll[3]?.change}</td>
                                <td className={pricesAll[3]?.changePersent < 0 ? styleStat.red :  styleStat.green}>({pricesAll[3]?.changePersent})%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Statistics;