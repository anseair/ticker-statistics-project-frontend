import React, {useState} from 'react';
import '../../CSS/correlation.css'

const CorrelationForm = () => {
    // const [dateFrom, setDateFrom] = useState('');
    // const [dateTo, setDateTo] = useState('');
    // const [firstTicker, setFirstTicker] = useState('');
    // const [secondTicker, setSecondTicker] = useState('');

    const handleChangeDateTo = (e) => {
        const dateTo = e.target.value;
        // setDateTo(dateTo);
        console.log(dateTo);
    }
    const handleChangeDateFrom = (e) => {
        const dateFrom = e.target.value;
        // setDateFrom(dateFrom);
        console.log(dateFrom);
    }
    const handleChangeFirstTicker = (e) => {
        const firstTicker = e.target.value;
        // setFirstTicker(firstTicker);
        console.log(firstTicker);
    }

    const handleChangeSecondTicker = (e) => {
        const secondTicker = e.target.value;
        // setSecondTicker(secondTicker);
        console.log(secondTicker);
    }

    return (
        <form className="correlation__form" id="correlation__form">
            <h4>Select stocks and analysis period</h4>
            <div className="date__container">
                <div className="input__container">
                    <label htmlFor="dateFrom1">From</label>
                    <input type="date" id="dateFrom1" placeholder="01.01.10" className="text"
                    onChange={handleChangeDateFrom}/>
                </div>
                <div className="input__container">
                    <label htmlFor="dateTo1">To</label>
                    <input type="date" id="dateTo1" placeholder="01.01.23" className="text"
                    onChange={handleChangeDateTo}/>
                </div>
            </div>
            <div className="input__container symbol">
                <label htmlFor="stock1">First Symbol</label>
                <input type="text" id="stock1" placeholder="AAPL" className="text"
                onChange={handleChangeFirstTicker}/>
            </div>
            <div className="input__container symbol">
                <label htmlFor="stock2">Second Symbol</label>
                <input type="text" id="stock2" placeholder="S&P500" className="text"
                onChange={handleChangeSecondTicker}/>
            </div>
            <button type="submit" className="button form__button">Calculate</button>
        </form>
    );
};

export default CorrelationForm;