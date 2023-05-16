import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import TickerItem from "./TickerItem";
import {useDispatch, useSelector} from "react-redux"
import {fetchTickers} from "../../actions/tickersAction";
import {fetchPriceAAPL, fetchPriceAMZN, fetchPriceGSPC,
    fetchPriceMainTicker, fetchPriceMSFT, fetchPriceTSLA
} from "../../actions/priceAction";
import {fetchMinMaxPriceMainTicker} from "../../actions/minMaxPriceAction";
import {randomNum} from "../../utils/constants";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {fetchAllPrices} from "../../actions/allPricesAction";


const Statistics = () => {
    const {tickers} = useSelector(state => state.tickers);
    const {pricesMainTicker, pricesAllTickers, beforePricesAllTickers} = useSelector(state => state.prices);
    const {minMaxPricesMainTicker} = useSelector(state => state.minMaxPrice);
    const data = useSelector(state => state.allPrices);
    const dispatch = useDispatch();
    const [ticker, setTicker] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [dateNow, setDateNow] = useState('');
    const [dateFromMonth, setDateFromMonth] = useState('');
    const [dateFromSixMonth, setDateFromSixMonth] = useState('');
    const [dateFromYear, setDateFromYear] = useState('');


    useEffect(() => {
        dispatch(fetchTickers());
        dispatch(fetchPriceAAPL('AAPL'));
        dispatch(fetchPriceAMZN('AMZN'));
        dispatch(fetchPriceMSFT('MSFT'));
        dispatch(fetchPriceTSLA('TSLA'));
        dispatch(fetchPriceGSPC('%5EGSPC'));
    }, []);

    const handleChange = (e) => {
        const ticker = e.target.value;
        localStorage.setItem('ticker', ticker)
        setTicker(ticker);
        console.log(e.target.value);
        dispatch(fetchPriceMainTicker(ticker));
    }

    const handleChangeDateFrom = (e) => {
        setDateFrom(e.target.value);
    }

    const handleChangeDateTo = (e) => {
        setDateTo(e.target.value);
    }

    const handleClickMinMax = () => {
        console.log(dateFrom);
        console.log(dateTo);
        dispatch(fetchMinMaxPriceMainTicker(ticker, dateFrom, dateTo));
        localStorage.setItem('minMaxPricesMainTicker', minMaxPricesMainTicker);
    }

    const handleClickMonth = () => {
        const count = 1000*60*60*24*30;
        const current = new Date();
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

        const current2 = new Date(current.setTime(current.getTime()-count));
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

        dispatch(fetchAllPrices(ticker, dateFromMonth, dateNow));
    }

    const handleClickSixMonth = () => {
        const count = 1000*60*60*24*180;
        const current = new Date();
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

        const current2 = new Date(current.setTime(current.getTime()-count));
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
        setDateFromSixMonth(`${year2}-${month2}-${day2}`);
        console.log(dateFromSixMonth);

        dispatch(fetchAllPrices(ticker, dateFromSixMonth, dateNow));
    }

    const handleClickYear = () => {
        const count = 1000*60*60*24*365;
        const current = new Date();
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

        const current2 = new Date(current.setTime(current.getTime()-count));
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
        setDateFromYear(`${year2}-${month2}-${day2}`);
        console.log(dateFromYear);

        dispatch(fetchAllPrices(ticker, dateFromYear, dateNow));
    }

    useEffect(() => {
        if(localStorage.getItem('ticker')){
            const ticker1 = localStorage.getItem('ticker');
            setTicker(ticker1);
            dispatch(fetchPriceMainTicker(ticker1));
        }
    },[])

    const data2 = {
        dates: ['25 febr', '1 april', '5 april', '10 april', '15 april', '20 april'],
        prices: [400, 300, 300, 200, 280, 150]
    };

    const data3 = [
        { date: '25 febr', price: 400},
        { date: '1 april', price: 300},
        { date: '5 april', price: 200},
        { date: '10 april', price: 200},
        { date: '15 april', price: 280},
        { date: '20 april', price: 150}
    ];

    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1 className="page__title">Statistics</h1></div>
            </section>
            <section className="page-statistic">
                <section className="page-statistic__main">
                    <button type="submit" className="button form__button correlation__button me-1"
                            id="statsBtn" onClick={handleClickMonth}>1MONTH
                    </button>
                    <button type="submit" className="button form__button correlation__button me-1"
                            id="statsBtn" onClick={handleClickSixMonth}>6MONTH
                    </button>
                    <button type="submit" className="button form__button correlation__button me-1"
                            id="statsBtn" onClick={handleClickYear}>1YEAR
                    </button>
                    <LineChart width={800} height={300} data={data} margin={ {top: 50, right: 20, bottom: 5, left: 20} }>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date" width={3}/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="price" stroke="red" dot={false} />
                    </LineChart>
                </section>
                <section className="page-statistic__sideBar">

                    <div className={styleStat.stock__info}>
                        <select className="form-select"  onChange={handleChange} value={ticker}>
                            <option value='' disabled hidden>Select ticker</option>
                            {tickers.map((text) => {
                                return <option key={text} value={text}>{text}</option>
                                }
                                // <TickerItem key={text} ticker={text}/>
                            )}
                        </select>
                        <h4 className={styleStat.stock__name}>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</h4>
                        <div className={styleStat.price__now}>
                            <span className={styleStat.prise}>{pricesMainTicker[0]}</span>
                            <span className={(pricesMainTicker[0]-pricesMainTicker[1]).toFixed(2) < 0 ? styleStat.chgRed : styleStat.chgGreen}>{(pricesMainTicker[0]-pricesMainTicker[1]).toFixed(2)}</span>
                            <span className={((pricesMainTicker[0]-pricesMainTicker[1])/pricesMainTicker[0]*100).toFixed(2) < 0 ? styleStat.chgRed : styleStat.chgGreen}>({((pricesMainTicker[0]-pricesMainTicker[1])/pricesMainTicker[0]*100).toFixed(2)})%</span>
                        </div>
                        <div className="period">
                            <div className="date__container">
                                <div className="input__container">
                                    <label htmlFor="dateFrom1">From</label>
                                    <input type="date" id="dateFrom1" className="text"
                                        onChange={handleChangeDateFrom}/>
                                </div>
                                <div className="input__container">
                                    <label htmlFor="dateTo1">To</label>
                                    <input type="date" id="dateTo1" className="text"
                                        onChange={handleChangeDateTo}/>
                                </div>
                            </div>
                        {/*<div className="period">*/}
                        {/*    <p className="from">from: <input type={"date"} className="text" onChange={handleChangeDateFrom}></input></p>*/}
                        {/*    <p className="to">to: <input type={"date"} className='text' onChange={handleChangeDateTo}></input></p>*/}
                            <button type="submit" className="button form__button" id="statsBtn"
                                    onClick={handleClickMinMax}>VIEW STATISTIC</button>
                        </div>
                        <p className="min_prise">Min.price: {minMaxPricesMainTicker[0]}</p>
                        <p className="min_prise">Max.price: {minMaxPricesMainTicker[1]}</p>
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
                                <th className={styleStat.stock} scope="row">AAPL</th>
                                <td>{pricesAllTickers[0]}</td>
                                <td className={(pricesAllTickers[0]-beforePricesAllTickers[0]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{(pricesAllTickers[0]-beforePricesAllTickers[0]).toFixed(2)}</td>
                                <td className={(pricesAllTickers[0]-beforePricesAllTickers[0]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{((pricesAllTickers[0]-beforePricesAllTickers[0])/pricesAllTickers[0]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">AMZN</th>
                                <td>{pricesAllTickers[1]}</td>
                                <td className={(pricesAllTickers[1]-beforePricesAllTickers[1]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{(pricesAllTickers[1]-beforePricesAllTickers[1]).toFixed(2)}</td>
                                <td className={(pricesAllTickers[1]-beforePricesAllTickers[1]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{((pricesAllTickers[1]-beforePricesAllTickers[1])/pricesAllTickers[1]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">MSFT</th>
                                <td>{pricesAllTickers[2]}</td>
                                <td className={(pricesAllTickers[2]-beforePricesAllTickers[2]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{(pricesAllTickers[2]-beforePricesAllTickers[2]).toFixed(2)}</td>
                                <td className={(pricesAllTickers[2]-beforePricesAllTickers[2]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{((pricesAllTickers[2]-beforePricesAllTickers[2])/pricesAllTickers[2]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">TSLA</th>
                                <td>{pricesAllTickers[3]}</td>
                                <td className={(pricesAllTickers[3]-beforePricesAllTickers[3]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{(pricesAllTickers[3]-beforePricesAllTickers[3]).toFixed(2)}</td>
                                <td className={(pricesAllTickers[3]-beforePricesAllTickers[3]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{((pricesAllTickers[3]-beforePricesAllTickers[3])/pricesAllTickers[3]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">^GSPC</th>
                                <td>{pricesAllTickers[4]}</td>
                                <td className={(pricesAllTickers[4]-beforePricesAllTickers[4]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{(pricesAllTickers[4]-beforePricesAllTickers[4]).toFixed(2)}</td>
                                <td className={(pricesAllTickers[4]-beforePricesAllTickers[4]).toFixed(2) < 0 ? styleStat.red :  styleStat.green}>{((pricesAllTickers[4]-beforePricesAllTickers[4])/pricesAllTickers[4]*100).toFixed(2)}%</td>
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