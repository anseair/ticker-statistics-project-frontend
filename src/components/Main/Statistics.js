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


const Statistics = () => {
    const {tickers} = useSelector(state => state.tickers);
    const {pricesMainTicker, pricesAllTickers, beforePricesAllTickers} = useSelector(state => state.prices);
    const {minMaxPricesMainTicker} = useSelector(state => state.minMaxPrice);
    const dispatch = useDispatch();
    const [ticker, setTicker] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

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

    const handleChangeMinMax = () => {
        console.log(dateFrom);
        console.log(dateTo);
        dispatch(fetchMinMaxPriceMainTicker(ticker, dateFrom, dateTo));
        localStorage.setItem('minMaxPricesMainTicker', minMaxPricesMainTicker);
    }

    useEffect(() => {
        if(localStorage.getItem('ticker')){
            const ticker1 = localStorage.getItem('ticker');
            setTicker(ticker1);
            dispatch(fetchPriceMainTicker(ticker1));
        }
    },[])

    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1 className="page__title">Statistics</h1></div>
            </section>
            <section className="page-statistic">
                <section className="page-statistic__main">

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
                                    onClick={handleChangeMinMax}>VIEW STATISTIC</button>
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