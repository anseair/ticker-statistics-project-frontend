import React from 'react';
import style from '../../CSS/service.module.css'

const Services = () => {
    return (
        <section className={style.service}>
            <ul className={style.services__list}>
                <li className={`${style.service__item} ${style.service__item_black}`}>
                    <div className={style.service__num}>01</div>
                    <div className={style.service__content}>
                        <h4 className={style.services__subtitle}>Exploring Securities Trends</h4>
                        <h3 className={style.services__title}>Statistics</h3>
                    </div>
                </li>
                <li className={`${style.service__item} ${style.service__item_red}`}>
                    <div className={style.service__num}>02</div>
                    <div className={style.service__content}>
                        <h4 className={style.services__subtitle}>Smart Investment Insights</h4>
                        <h3 className={style.services__title}>Analysis</h3>
                    </div>
                </li>
                <li className={`${style.service__item} ${style.service__item_grey}`}>
                    <div className={style.service__num}>03</div>
                    <div className={style.service__content}>
                        <h4 className={style.services__subtitle}>Real-Time Data & Analysis</h4>
                        <h3 className={style.services__title}>Stock API</h3>
                    </div>
                </li>
            </ul>
        </section>
    );
};

export default Services;