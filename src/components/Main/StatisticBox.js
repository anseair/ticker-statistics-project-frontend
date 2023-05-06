import React, {useEffect} from 'react';
import style from '../../CSS/statistic.module.css'
import styleStat from '../../CSS/stat.module.css'
import {fetchPriceAAPL, fetchPriceAMZN, fetchPriceGSPC, fetchPriceMSFT, fetchPriceTSLA} from "../../actions/priceAction";
import {useDispatch, useSelector} from "react-redux";

const StatisticBox = () => {
    const {prices, beforePrices} = useSelector(state => state.prices);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(fetchPrice(tickers[random]));
        dispatch(fetchPriceAAPL('AAPL'));
        dispatch(fetchPriceAMZN('AMZN'));
        dispatch(fetchPriceMSFT('MSFT'));
        dispatch(fetchPriceTSLA('TSLA'));
        dispatch(fetchPriceGSPC('%5EGSPC'));
    }, []);

    return (
        <div className={style.statistic__box}>
            <div className={style.statistic__chart}>
            </div>
            <div className={style.statistic__table}>
                <h5>Today's Price Fluctuations</h5>
                <table className="table table-hover table-dark">
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
                        <td className={styleStat.green}>{prices[0]-beforePrices[0]}</td>
                        <td className={styleStat.green}>>{(prices[0]-beforePrices[0])/prices[0]*100}</td>
                    </tr>
                    <tr>
                        <th className={styleStat.stock} scope="row">AMZN</th>
                        <td>{prices[1]}</td>
                        <td className={styleStat.red}>{prices[1]-beforePrices[1]}</td>
                        <td className={styleStat.red}>>{(prices[1]-beforePrices[1])/prices[1]*100}</td>
                    </tr>
                    <tr>
                        <th className={styleStat.stock} scope="row">GOOG</th>
                        <td>{prices[2]}</td>
                        <td className={styleStat.red}>{prices[2]-beforePrices[2]}</td>
                        <td className={styleStat.red}>>{(prices[2]-beforePrices[2])/prices[2]*100}</td>
                    </tr>
                    <tr>
                        <th className={styleStat.stock} scope="row">INTC</th>
                        <td>{prices[3]}</td>
                        <td className={styleStat.red}>{prices[3]-beforePrices[3]}</td>
                        <td className={styleStat.red}>>{(prices[3]-beforePrices[3])/prices[3]*100}</td>
                    </tr>
                    <tr>
                        <th className={styleStat.stock} scope="row">MSFT</th>
                        <td>{prices[4]}</td>
                        <td className={styleStat.green}>{prices[4]-beforePrices[4]}</td>
                        <td className={styleStat.green}>>{(prices[4]-beforePrices[4])/prices[4]*100}</td>
                    </tr>
                    <tr>
                        <th className={styleStat.stock} scope="row">TSLA</th>
                        <td>{prices[5]}</td>
                        <td className={styleStat.green}>{prices[5]-beforePrices[5]}</td>
                        <td className={styleStat.green}>>{(prices[5]-beforePrices[5])/prices[5]*100}</td>
                    </tr>
                    <tr>
                        <th className={styleStat.stock} scope="row">^GSPC</th>
                        <td>{prices[6]}</td>
                        <td className={styleStat.green}>{prices[6]-beforePrices[6]}</td>
                        <td className={styleStat.green}>>{(prices[6]-beforePrices[6])/prices[6]*100}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatisticBox;