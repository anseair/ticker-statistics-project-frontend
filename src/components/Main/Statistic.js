import React from 'react';
import StatisticForm from "./StatisticForm";
import StatisticBox from "./StatisticBox";
import style from '../../CSS/statistic.module.css'

const Statistic = () => {
    return (
        <section className={style.statistic}  id="statistic">
            <div className={style.statistic__container}>
                <h5 className={style.statistic__subtitle}>Data-Driven Strategies for Investment Success</h5>
                <h3 className={style.statistic__title}>Market Insights</h3>
                <div className="statistics">
                    <StatisticForm/>
                    <StatisticBox/>
                </div>
            </div>
        </section>
    );
};

export default Statistic;