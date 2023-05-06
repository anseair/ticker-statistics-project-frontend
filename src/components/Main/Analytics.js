import React, {useEffect, useState} from 'react';
import '../../CSS/analytics.css'
import '../../CSS/correlation.css'
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchPriceFirstTicker, fetchPriceSecondTicker} from "../../actions/priceAction";
import {
    fetchMaxMinPriceFirstTicker, fetchMaxMinPriceSecondTicker
} from "../../actions/maxAndMinPriceAction";

const Analytics = () => {

    const {pricesFirstTicker, pricesSecondTicker} = useSelector(state => state.prices);
    const {maxPrice, minPrice} = useSelector(state => state.maxMinPrice);
    const dispatch = useDispatch();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [firstTicker, setFirstTicker] = useState('');
    const [secondTicker, setSecondTicker] = useState('');

    const handleChangeDateTo = (e) => {
        setDateTo(e.target.value);
    }

    const handleChangeDateFrom = (e) => {
        setDateFrom(e.target.value);
    }

    const handleChangeFirstTicker = (e) => {
        const firstTicker = e.target.value;
        localStorage.setItem('firstTicker', firstTicker);
        setFirstTicker(firstTicker);
        console.log(firstTicker);
        dispatch(fetchPriceFirstTicker(firstTicker));
    }

    const handleChangeSecondTicker = (e) => {
        const secondTicker = e.target.value;
        localStorage.setItem('secondTicker', secondTicker);
        setSecondTicker(secondTicker);
        console.log(secondTicker);
        dispatch(fetchPriceSecondTicker(secondTicker));
    }

    useEffect(() => {
        if (localStorage.getItem('firstTicker')){
            const firstTicker1= localStorage.getItem('firstTicker');
            setFirstTicker(firstTicker1);
            dispatch(fetchPriceFirstTicker(firstTicker1));
        }
    },[])

    useEffect(() => {
        if (localStorage.getItem('secondTicker')){
            const secondTicker1= localStorage.getItem('secondTicker');
            setSecondTicker(secondTicker1);
            dispatch(fetchPriceSecondTicker(secondTicker1));
        }
    }, [])

    const handleChangeMinMax = () => {
        console.log(dateFrom);
        console.log(dateTo);
        dispatch(fetchMaxMinPriceFirstTicker(firstTicker, dateFrom, dateTo));
        dispatch(fetchMaxMinPriceSecondTicker(secondTicker, dateFrom, dateTo));
        localStorage.setItem('maxPrices', maxPrice);
        localStorage.setItem('minPrices',minPrice);
    }

    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1>Analytics</h1>
                </div>
            </section>
            <div className="container">
                {/*<section className="page__coreliation">*/}
                    <section className="correlation">
                        <div className="correlation__container">
                            <div className="correlation__box">
                                <div className="correlation__box--left">
                                    <div className="form__container">
                                        <div className="form correlationPage__form" id="form">
                                            <div className="input__container">
                                                <label htmlFor="dateFrom">From</label>
                                                <input type="date" id="dateFrom" placeholder="01.01.10"
                                                       className="text" onChange={handleChangeDateFrom}/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="dateTo">To</label>
                                                <input type="date" id="dateTo" placeholder="01.01.23" className="text"
                                                onChange={handleChangeDateTo}/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="stock">First stock</label>
                                                <input type="text" id="stock" placeholder="APPL" className="text"
                                                onChange={handleChangeFirstTicker}/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="stock">Second stock</label>
                                                <input type="text" id="stock" placeholder="AMZN" className="text"
                                                onChange={handleChangeSecondTicker}/>
                                            </div>
                                            {/*<div className="input__container">*/}
                                            {/*    <label htmlFor="amount">Amount $</label>*/}
                                            {/*    <input type="text" id="amount" placeholder="200" className="text"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="input__container">*/}
                                            {/*    <label htmlFor="period">Period</label>*/}
                                            {/*    <input type="number" id="period" placeholder="5" className="text"/>*/}
                                            {/*</div>*/}

                                            <button type="submit" className="button form__button correlation__button"
                                                    id="statsBtn" onClick={handleChangeMinMax}>
                                                Calculate
                                            </button>
                                        </div>
                                    </div>
                                    <div className="correlation__chart">
                                    </div>
                                </div>
                                <div className="correlation__info">
                                    <div className={styleStat.stock__info}>
                                        <h3 className={styleStat.stock__symbol}>{firstTicker}</h3>
                                        <h4 className={styleStat.stock__name}>NasdaqGS - NasdaqGS Real Time Price. Currency in
                                            USD</h4>
                                        <div className={styleStat.price__now}>
                                            <span className={styleStat.prise}>{pricesFirstTicker[0]}</span>
                                            <span className={`${styleStat.chg} ${styleStat.red}`}>{(pricesFirstTicker[0]-pricesFirstTicker[1]).toFixed(2)}</span>
                                            <span className={`${styleStat.chg} ${styleStat.red}`}>({((pricesFirstTicker[0]-pricesFirstTicker[1])/pricesFirstTicker[0]*100).toFixed(2)})%</span>
                                        </div>
                                        <p className="min_prise">Min.price: {minPrice[0]}</p>
                                        <p className="min_prise">Max.price: {maxPrice[0]}</p>
                                    </div>

                                    <div className={styleStat.stock__info}>
                                        <h3 className={styleStat.stock__symbol}>{secondTicker}</h3>
                                        <h4 className={styleStat.stock__name}>COMEX - COMEX Delayed Price. Currency in USD
                                        </h4>
                                        <div className={styleStat.price__now}>
                                            <span className={styleStat.prise}>{pricesSecondTicker[2]}</span>
                                            <span className={`${styleStat.chg} ${styleStat.red}`}>{(pricesSecondTicker[2]-pricesSecondTicker[3]).toFixed(2)}</span>
                                            <span className={`${styleStat.chg} ${styleStat.red}`}>({((pricesSecondTicker[2]-pricesSecondTicker[3])/pricesSecondTicker[2]*100).toFixed(2)})%</span>
                                            <p className="min_prise">Min.price: {minPrice[1]}</p>
                                            <p className="min_prise">Max.price: {maxPrice[1]}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <section className="analysis">
                        <h2>Тут блок аналитики я думаю сначала нужно посмотреть на графики и там уже создать интересные
                            виджеты...
                        </h2>
                    </section>
                {/*</section>*/}
            </div>
        </>
    );
};

export default Analytics;