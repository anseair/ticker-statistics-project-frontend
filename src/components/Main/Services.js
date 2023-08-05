import React from 'react';
import style from '../../CSS/service.module.css'

const Services = () => {
    return (
        <section className={style.service}>
            <ul className={style.services__list}>
                <li className={`${style.service__item} ${style.service__item_black}`} >
                    <a data-scroll href="#statistic">
                    <div className={style.service__num}>01</div>
                    <div className={style.service__content} >
                        <h4 className={style.services__subtitle}>Exploring Securities Trends</h4>
                        <h3 className={style.services__title}>Correlation</h3>
                    </div>
                    </a>
                </li>
                <li className={`${style.service__item} ${style.service__item_red}`} id="analysis">
                    <a data-croll href="#analysis">
                    <div className={style.service__num}>02</div>
                    <div className={style.service__content}>
                        <h4 className={style.services__subtitle}>Smart Investment Insights</h4>
                        <h3 className={style.services__title}>Analysis</h3>
                    </div>
                    </a>
                </li>
                <li className={`${style.service__item} ${style.service__item_grey}`}>
                    <a data-scroll href="#stockApi">
                    <div className={style.service__num}>03</div>
                    <div className={style.service__content}>
                        <h4 className={style.services__subtitle}>Latest Stock Market Information</h4>
                        <h3 className={style.services__title}>Price Data</h3>
                    </div>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Services;