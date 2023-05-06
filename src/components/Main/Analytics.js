import React, {useEffect, useState} from 'react';
import '../../CSS/analytics.css'
import '../../CSS/correlation.css'
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchPrice, fetchPriceFirstTicker, fetchPriceSecondTicker} from "../../actions/priceAction";
import {fetchMinMaxPriceFirstTicker, fetchMinMaxPriceSecondTicker} from "../../actions/minMaxPriceAction";
import {fetchCorrelation} from "../../actions/correlationAction";
import {fetchStatistic} from "../../actions/statisticAction";

const Analytics = () => {

    const {pricesFirstTicker, pricesSecondTicker} = useSelector(state => state.prices);
    const {minMaxPriceFirstTicker, minMaxPriceSecondTicker} = useSelector(state => state.minMaxPrice);
    const {text} = useSelector(state => state.correlation);
    const statistic = useSelector(state => state.statisticInfo);
    const dispatch = useDispatch();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [firstTicker, setFirstTicker] = useState('');
    const [secondTicker, setSecondTicker] = useState('');

    const [ticker, setTicker] = useState('');
    const [dateFrom2, setDateFrom2] = useState('');
    const [dateTo2, setDateTo2] = useState('');
    const [depositPeriodDays, setDepositPeriodDays] = useState('');
    const [depositSum, setDepositSum] = useState('');

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

    const handleClickCorrelation = () => {
        console.log(dateFrom);
        console.log(dateTo);
        dispatch(fetchMinMaxPriceFirstTicker(firstTicker, dateFrom, dateTo));
        dispatch(fetchMinMaxPriceSecondTicker(secondTicker, dateFrom, dateTo));
        localStorage.setItem('minMaxPriceFirstTicker', minMaxPriceFirstTicker);
        localStorage.setItem('minMaxPriceSecondTicker',minMaxPriceSecondTicker);
        dispatch(fetchCorrelation(firstTicker, secondTicker, dateFrom, dateTo));
        localStorage.setItem('correlation', text);
    }

    const handleChangeTicker = (e) => {
        const ticker = e.target.value;
        localStorage.setItem('ticker', ticker);
        setTicker(ticker);
        console.log(ticker);
        dispatch(fetchPrice(ticker));
    }

    const handleClickStatistic = () => {
        console.log(dateFrom2);
        console.log(dateTo2);
        console.log(depositPeriodDays);
        console.log(depositSum);
        dispatch(fetchStatistic(ticker, dateFrom2, dateTo2, depositPeriodDays, depositSum));
        localStorage.setItem('statistic', statistic);
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
                                            {/*<div className="period">*/}
                                            {/*    <div className="date__container">*/}
                                                    <div className="input__container">
                                                        <label htmlFor="dateFrom">From</label>
                                                        <input type="date" id="dateFrom" className="text"
                                                             onChange={(e) => setDateFrom(e.target.value)}/>
                                                    </div>
                                                    <div className="input__container">
                                                        <label htmlFor="dateTo">To</label>
                                                        <input type="date" id="dateTo" className="text"
                                                            onChange={(e) => setDateTo(e.target.value)}/>
                                                    </div>
                                                {/*</div>*/}
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
                                                <button type="submit" className="button form__button correlation__button"
                                                        id="statsBtn" onClick={handleClickCorrelation}>
                                                    Calculate
                                                </button>
                                            </div>
                                        {/*</div>*/}
                                    </div>
                                    <div className={styleStat.correlation}>
                                        <h4>{text}</h4>
                                    </div>

                                    <div className="form__container">
                                        <div className="form correlationPage__form" id="form">
                                            <div className="input__container">
                                                <label htmlFor="dateFrom">From</label>
                                                <input type="date" id="dateFrom" placeholder="01.01.10"
                                                       className="text" onChange={(e) => setDateFrom2(e.target.value)}/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="dateTo">To</label>
                                                <input type="date" id="dateTo" placeholder="01.01.23" className="text"
                                                       onChange={(e) => setDateTo2(e.target.value)}/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="stock">Stock</label>
                                                <input type="text" id="stock" placeholder="APPL" className="text"
                                                       onChange={handleChangeTicker}/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="stock">deposit period days</label>
                                                <input type="number" className="text"
                                                       onChange={(e) => setDepositPeriodDays(e.target.value)}/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="stock">deposit summa</label>
                                                <input type="number" className="text"
                                                       onChange={(e) => setDepositSum(e.target.value)}/>
                                            </div>
                                            <button type="submit" className="button form__button correlation__button"
                                                    id="statsBtn" onClick={handleClickStatistic}>
                                                Calculate
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styleStat.correlation}>
                                        <p>ticker names: {statistic.tickerNames}</p>
                                        <p>deposit period days: {statistic.depositPeriodDays}</p>
                                        <p>deposit sum: {statistic.depositSum}</p>
                                        <p>minStat: <br/>
                                            minDateStart: {statistic.minStat.minDateStart} <br/>
                                            minDateEnd: {statistic.minStat.minDateEnd} <br/>
                                            minPriceStart: {statistic.minStat.minPriceStart} <br/>
                                            minPriceEnd: {statistic.minStat.minPriceEnd} <br/>
                                            minPercentApy: {statistic.minStat.minPercentApy} <br/>
                                            minRevenue: {statistic.minStat.minRevenue} <br/>
                                        </p>
                                        <p>maxStat: <br/>
                                            maxDateStart: {statistic.maxStat.maxDateStart}, <br/>
                                            maxDateEnd: {statistic.maxStat.maxDateEnd}, <br/>
                                            maxPriceStart: {statistic.maxStat.maxPriceStart}, <br/>
                                            maxPriceEnd: {statistic.maxStat.maxPriceEnd}, <br/>
                                            maxPercentApy: {statistic.maxStat.maxPercentApy}, <br/>
                                            maxRevenue: {statistic.maxStat.maxRevenue} <br/>
                                        </p>
                                        <p>
                                        avgPercent: {statistic.avgPercent}, <br/>
                                        avgRevenue: {statistic.avgRevenue}
                                        </p>
                                    </div>
                                    <div className="correlation__chart">
                                    </div>
                                </div>
                                <div className="page-analytics__sideBar">
                                    <div className={styleStat.stock__info}>
                                        <h3 className={styleStat.stock__symbol}>{firstTicker}</h3>
                                        <h4 className={styleStat.stock__name}>NasdaqGS - NasdaqGS Real Time Price. Currency in
                                            USD</h4>
                                        <div className={styleStat.price__now}>
                                            <span className={styleStat.prise}>{pricesFirstTicker[0]}</span>
                                            <span className={(pricesFirstTicker[0]-pricesFirstTicker[1]).toFixed(2) < 0 ? styleStat.chgRed : styleStat.chgGreen}>{(pricesFirstTicker[0]-pricesFirstTicker[1]).toFixed(2)}</span>
                                            <span className={((pricesFirstTicker[0]-pricesFirstTicker[1])/pricesFirstTicker[0]*100).toFixed(2) < 0 ? styleStat.chgRed : styleStat.chgGreen}>({((pricesFirstTicker[0]-pricesFirstTicker[1])/pricesFirstTicker[0]*100).toFixed(2)})%</span>
                                        </div>
                                        <p className="min_prise">Min.price: {minMaxPriceFirstTicker[0]}</p>
                                        <p className="min_prise">Max.price: {minMaxPriceFirstTicker[1]}</p>
                                    </div>

                                    <div className={styleStat.stock__info}>
                                        <h3 className={styleStat.stock__symbol}>{secondTicker}</h3>
                                        <h4 className={styleStat.stock__name}>COMEX - COMEX Delayed Price. Currency in USD
                                        </h4>
                                        <div className={styleStat.price__now}>
                                            <span className={styleStat.prise}>{pricesSecondTicker[0]}</span>
                                            <span className={(pricesSecondTicker[0]-pricesSecondTicker[1]).toFixed(2) < 0 ? styleStat.chgRed : styleStat.chgGreen}>{(pricesSecondTicker[0]-pricesSecondTicker[1]).toFixed(2)}</span>
                                            <span className={((pricesSecondTicker[0]-pricesSecondTicker[1])/pricesSecondTicker[0]*100).toFixed(2) < 0 ? styleStat.chgRed : styleStat.chgGreen}>({((pricesSecondTicker[0]-pricesSecondTicker[1])/pricesSecondTicker[0]*100).toFixed(2)})%</span>
                                        <p className="min_prise">Min.price: {minMaxPriceSecondTicker[0]}</p>
                                            <p className="min_prise">Max.price: {minMaxPriceSecondTicker[1]}</p>
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