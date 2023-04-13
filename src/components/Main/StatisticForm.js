import React from 'react';
import style from '../../CSS/statistic.module.css'

const StatisticForm = () => {
    return (
        <div className={style.form__container}>
            <form className={style.form} id="form">
                <div className={style.input__container}>
                    <label htmlFor="dateFrom">From</label>
                    <input type="date" id="dateFrom" placeholder="01.01.10" className="text"/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="dateTo">To</label>
                    <input type="date" id="dateTo" placeholder="01.01.23" className="text"/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" id="stock" placeholder="APPL" className="text"/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="amount">Amount $</label>
                    <input type="text" id="amount" placeholder="200" className="text"/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="period">Period</label>
                    <input type="number" id="period" placeholder="5" className="text"/>
                </div>
                <button type="submit" className="button form__button" id="statsBtn">Calculate</button>
            </form>
        </div>
    );
};

export default StatisticForm;