import React from 'react';
import style from '../../CSS/statistic.module.css'
import statistics from '../../Videos/statistics.mp4'

const Statistic = () => {
    return (
        <section className={style.statistic} id="statistic">
            <div className={style.statistic__container}>
                <h5 className={style.statistic__subtitle}>Data-Driven Strategies for Investment Success</h5>
                <h3 className={style.statistic__title}>An investor's primary goal is to make money. Although you can't
                    predict how your investment portfolio will perform, there are several metrics that investors can use
                    to calculate a realistic estimate of future growth.</h3>
                <video width="1000" height="500" controls muted autoPlay loop>
                    <source src={statistics} type="video/mp4"/>
                </video>
            </div>
        </section>
    );
};

export default Statistic;