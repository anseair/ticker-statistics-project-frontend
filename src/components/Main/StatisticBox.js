import React, {useEffect} from 'react';
import style from '../../CSS/statistic.module.css'
import styleStat from '../../CSS/stat.module.css'
import {fetchPriceAAPL, fetchPriceAMZN, fetchPriceGSPC, fetchPriceMSFT, fetchPriceTSLA} from "../../actions/priceAction";
import {useDispatch, useSelector} from "react-redux";

const StatisticBox = () => {
    const {pricesAllTickers, beforePricesAllTickers} = useSelector(state => state.prices);
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
        </div>
    );
};

export default StatisticBox;