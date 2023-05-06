import React, {useState} from 'react';
import style from '../../CSS/statistic.module.css'

const StatisticForm = () => {

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [ticker, setTicker] = useState('')
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('');

    const handleChangeDateTo = (e) => {
        const dateTo = e.target.value;
        setDateTo(dateTo);
        console.log(dateTo);
    }
    const handleChangeDateFrom = (e) => {
        const dateFrom = e.target.value;
        setDateFrom(dateFrom);
        console.log(dateFrom);
    }
    const handleChangeTicker = (e) => {
        const firstTicker = e.target.value;
        setTicker(firstTicker);
        console.log(firstTicker);
    }

    const handleChangeAmount = (e) => {
        const amount= e.target.value;
        setAmount(amount);
        console.log(amount);
    }
    const handleChangePeriod = (e) => {
        const period = e.target.value;
        setPeriod(period);
        console.log(period);
    }
    return (
        <div className={style.form__container}>
            <form className={style.form} id="form">
                <div className={style.input__container}>
                    <label htmlFor="dateFrom">From</label>
                    <input type="date" id="dateFrom" placeholder="01.01.10" className="text"
                    onChange={handleChangeDateFrom}/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="dateTo">To</label>
                    <input type="date" id="dateTo" placeholder="01.01.23" className="text"
                    onChange={handleChangeDateTo}/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" id="stock" placeholder="APPL" className="text"
                    onChange={handleChangeTicker}/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="amount">Amount $</label>
                    <input type="text" id="amount" placeholder="200" className="text"
                    onChange={handleChangeAmount}/>
                </div>
                <div className={style.input__container}>
                    <label htmlFor="period">Period</label>
                    <input type="number" id="period" placeholder="5" className="text"
                    onChange={handleChangePeriod}/>
                </div>
                <button type="submit" className="button form__button" id="statsBtn">Calculate</button>
            </form>
        </div>
    );
};

export default StatisticForm;