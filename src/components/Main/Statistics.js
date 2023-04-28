import React, {useEffect, useState} from 'react';
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import TickerItem from "./TickerItem";
import {useDispatch, useSelector} from "react-redux"
import {fetchTickers} from "../../actions/tickersAction";
import {
    fetchLastPrice,
    fetchLastPriceAAPL,
    fetchLastPriceAMZN,
    fetchLastPriceGOOG, fetchLastPriceGSPC,
    fetchLastPriceINTC, fetchLastPriceMSFT, fetchLastPriceTSLA
} from "../../actions/priceAction";
import {fetchMaxPrice, fetchMinPrice} from "../../actions/maxAndMinPriceAction";

const Statistics = () => {
    const {tickers}= useSelector(state => state.tickers);
    const {prices} = useSelector(state => state.prices);
    const {priceTicker} = useSelector(state => state.prices);
    const {maxPrice, minPrice} = useSelector(state => state.maxMinPrice);
    const dispatch = useDispatch();
    const [ticker, setTicker] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    useEffect(() => {
        dispatch(fetchLastPriceAAPL('AAPL'));
        dispatch(fetchLastPriceAMZN('AMZN'));
        dispatch(fetchLastPriceGOOG('GOOG'));
        dispatch(fetchLastPriceINTC('INTC'));
        dispatch(fetchLastPriceMSFT('MSFT'));
        dispatch(fetchLastPriceTSLA('TSLA'));
        dispatch(fetchLastPriceGSPC('%5EGSPC'));
        dispatch(fetchTickers());
    }, []);

    const handleChange = (e) => {
        const ticker = e.target.value;
        setTicker(ticker);
        console.log(e.target.value);
        dispatch(fetchLastPrice(ticker));
    }

    const handleChangeDateFrom = (e) => {
        setDateFrom(e.target.value);
        console.log(dateFrom);
    }

    const handleChangeDateTo = (e) => {
        setDateTo(e.target.value);
        console.log(dateTo);
        dispatch(fetchMaxPrice(ticker, dateFrom, dateTo));
        dispatch(fetchMinPrice(ticker, dateFrom, dateTo));
    }



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
                        <select className="form-select"  defaultValue='' onChange={handleChange}>
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
                        <div className={styleStat.price__now}>
                            <span className={styleStat.prise}>{priceTicker}</span>
                            <span className={styleStat.chg}>+0.26</span>
                            <span className={styleStat.chg}>(+0.2%)</span>
                        </div>
                        <p className="min_prise">Min.price: {minPrice}</p>
                        <p className="min_prise">Max.price: {maxPrice}</p>

                    </div>
                    <div className="page-statistic__table">
                        <h5>Today's Price Fluctuations</h5>
                        <table className="table table-hover table-light">
                            <thead>
                            <tr>
                                <th className={styleStat.stock} scope="col">Stocks</th>
                                <th className={styleStat.stock} scope="col">Last</th>
                                <th className={styleStat.stock} scope="col">Chg</th>
                                <th className={styleStat.stock} scope="col">Chg%</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th className={styleStat.stock} scope="row">AAPL</th>
                                <td>{prices[0]}</td>
                                <td className={styleStat.green}>+12.30</td>
                                <td className={styleStat.green}>+0.62%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">AMZN</th>
                                <td>{prices[1]}</td>
                                <td className={styleStat.red}>-43.64</td>
                                <td className={styleStat.red}>-1.10%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">GOOG</th>
                                <td>{prices[2]}</td>
                                <td className={styleStat.red}>-0.85</td>
                                <td className={styleStat.red}>-0.55%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">INTC</th>
                                <td>{prices[3]}</td>
                                <td className={styleStat.red}>-4.00</td>
                                <td className={styleStat.red}>-2.17%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">MSFT</th>
                                <td>{prices[4]}</td>
                                <td className={styleStat.green}>+3.75</td>
                                <td className={styleStat.green}>+16.31%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">TSLA</th>
                                <td>{prices[5]}</td>
                                <td className={styleStat.green}>+12.30</td>
                                <td className={styleStat.green}>+0.62%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">^GSPC</th>
                                <td>{prices[6]}</td>
                                <td className={styleStat.red}>-43.64</td>
                                <td className={styleStat.red}>-1.10%</td>
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