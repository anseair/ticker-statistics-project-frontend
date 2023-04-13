import React from 'react';
import style from '../../CSS/statistic.module.css'
import styleStat from '../../CSS/stat.module.css'

const StatisticBox = () => {
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatisticBox;