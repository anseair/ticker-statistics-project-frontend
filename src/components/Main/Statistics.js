import React, {useEffect, useState} from 'react';
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import TickerItem from "./TickerItem";
import {useDispatch, useSelector} from "react-redux"
import {fetchTickers} from "../../actions/tickersAction";
import {fetchLastPrice} from "../../actions/priceAction";
import {baseUrl} from "../../utils/constants";
import {putTickers} from "../../slices/tickersSlice";
import {errorPrice, putPrice} from "../../slices/priceSlice";
import {logDOM} from "@testing-library/react";

const Statistics = () => {
    // const {tickers}= useSelector(state => state.tickers);
    // const {prices} = useSelector(state => state);

    const [price, setPrice] = useState('');
    const [tickers, setTickers] = useState([]);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     async function fetchTickers() {
    //         const response = await fetch(`${baseUrl}/financials/tickers`
    //             // mode: "no-cors",
    //             // method: 'GET',
    //             // credentials: 'same-origin'
    //         );
    //         const data = await response.json();
    //         const ticker1 = data.map(item => item);
    //         // dispatch(putTickers(data));
    //         setTickers(ticker1);
    //     }
    // }, []);

    const fetchPrice = async() => {
        const response = await fetch(`${baseUrl}/financials/ticker/AAPL/2023-04-20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            mode: 'no-cors'
        });
        const data = await response.json();
        const price1 = data.priceClose;
        setPrice(price1);
    }

    useEffect(() => {
        fetchPrice()
    }, []);

    // const handleChange = event => {
    //     console.log(event.target.value);
    //     setTickers(event.target.value);
    // };
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
                        <select className="form-select" name='tickers'>
                            <option value="" disabled selected hidden>select</option>
                            {tickers.map((text) =>
                                // return <option value={text}>{ticker}</option>
                                // }
                                <TickerItem key={text} ticker={text}/>
                            )}
                        </select>
                        <h4 className={styleStat.stock__name}>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</h4>
                        <div className="period">
                            <p className="from">from: <span>01.01.2010</span></p>
                            <p className="to">to: <span>01.01.2020</span></p>
                        </div>
                        <div className={styleStat.price__now}>
                            <span className={styleStat.prise}>157.66</span>
                            <span className={styleStat.chg}>+0.26</span>
                            <span className={styleStat.chg}>(+0.2%)</span>
                        </div>
                        <p className="min_prise">Min.price: 132.2</p>
                        <p className="min_prise">Max.price: 161.30</p>

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
                                <td>{price}</td>
                                <td className={styleStat.green}>+12.30</td>
                                <td className={styleStat.green}>+0.62%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">S&P500</th>
                                <td>3916.04</td>
                                <td className={styleStat.red}>-43.64</td>
                                <td className={styleStat.red}>-1.10%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">APPL</th>
                                <td>155.00</td>
                                <td className={styleStat.red}>-0.85</td>
                                <td className={styleStat.red}>-0.55%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">TSLA</th>
                                <td>180.13</td>
                                <td className={styleStat.red}>-4.00</td>
                                <td className={styleStat.red}>-2.17%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">VIX</th>
                                <td>26.74</td>
                                <td className={styleStat.green}>+3.75</td>
                                <td className={styleStat.green}>+16.31%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">Gold</th>
                                <td>1985.80</td>
                                <td className={styleStat.green}>+12.30</td>
                                <td className={styleStat.green}>+0.62%</td>
                            </tr>
                            <tr>
                                <th className={styleStat.stock} scope="row">S&P500</th>
                                <td>3916.04</td>
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