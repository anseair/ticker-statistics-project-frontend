import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import TickerItem from "./TickerItem";
import {useDispatch, useSelector} from "react-redux"
import {fetchTickers} from "../../actions/tickersAction";
import {
    fetchPrice, fetchPriceAAPL, fetchPriceAMZN, fetchPriceGSPC,
    fetchPriceMainTicker, fetchPriceMSFT, fetchPriceTSLA
} from "../../actions/priceAction";
import {fetchMaxMinPriceMainTicker} from "../../actions/maxAndMinPriceAction";
import {randomNum} from "../../utils/constants";


const Statistics = () => {
    const {tickers} = useSelector(state => state.tickers);
    const {pricesMainTicker, prices, beforePrices} = useSelector(state => state.prices);
    const {minMaxPricesMainTicker} = useSelector(state => state.maxMinPrice);
    const dispatch = useDispatch();
    const [ticker, setTicker] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    useEffect(() => {
        dispatch(fetchTickers());
        // dispatch(fetchPrice(tickers[random]));
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
        dispatch(fetchMaxMinPriceMainTicker(ticker, dateFrom, dateTo));
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
                        <div className="period">
                            <p className="from">from: <input type={"date"} className="text" onChange={handleChangeDateFrom}></input></p>
                            <p className="to">to: <input type={"date"} className='text' onChange={handleChangeDateTo}></input></p>
                        </div>

                        <button type="submit" className="button form__button" id="statsBtn" onClick={handleChangeMinMax}>VIEW STATISTIC</button>
                        <div className={styleStat.price__now}>
                            <span className={styleStat.prise}>{pricesMainTicker[0]}</span>
                            <span className={styleStat.chg}>{(pricesMainTicker[0]-pricesMainTicker[1]).toFixed(2)}</span>
                            <span className={styleStat.chg}>({((pricesMainTicker[0]-pricesMainTicker[1])/pricesMainTicker[0]*100).toFixed(2)})%</span>
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
                                <td>{prices[0]}</td>
                                <td className={styleStat.red}>{(prices[0]-beforePrices[0]).toFixed(2)}</td>
                                <td className={styleStat.red}>{((prices[0]-beforePrices[0])/prices[0]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">AMZN</th>
                                <td>{prices[1]}</td>
                                <td className={styleStat.green}>{(prices[1]-beforePrices[1]).toFixed(2)}</td>
                                <td className={styleStat.green}>{((prices[1]-beforePrices[1])/prices[1]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">MSFT</th>
                                <td>{prices[2]}</td>
                                <td className={styleStat.green}>{(prices[2]-beforePrices[2]).toFixed(2)}</td>
                                <td className={styleStat.green}>{((prices[2]-beforePrices[2])/prices[2]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">TSLA</th>
                                <td>{prices[3]}</td>
                                <td className={styleStat.red}>{(prices[3]-beforePrices[3]).toFixed(2)}</td>
                                <td className={styleStat.red}>{((prices[3]-beforePrices[3])/prices[3]*100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">^GSPC</th>
                                <td>{prices[4]}</td>
                                <td className={styleStat.green}>{(prices[4]-beforePrices[4]).toFixed(2)}</td>
                                <td className={styleStat.green}>{((prices[4]-beforePrices[4])/prices[4]*100).toFixed(2)}%</td>
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