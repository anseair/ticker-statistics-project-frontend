import React, {useEffect} from 'react';
import style from '../../CSS/statistic.module.css'
import styleStat from '../../CSS/stat.module.css'
import {fetchPrice} from "../../actions/priceAction";
import {useDispatch, useSelector} from "react-redux";

const StatisticBox = () => {
    const {tickers} = useSelector(state => state.tickers);
    const {pricesAll} = useSelector(state => state.prices);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPrice(tickers));
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
        </div>
    );
};

export default StatisticBox;