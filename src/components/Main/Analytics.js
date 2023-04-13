import React from 'react';
import '../../CSS/analytics.css'
import '../../CSS/correlation.css'
import '../../CSS/statistics.css'
import styleStat from '../../CSS/stat.module.css'

const Analytics = () => {
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
                                        <form className="form correlationPage__form" id="form">
                                            <div className="input__container">
                                                <label htmlFor="dateFrom">From</label>
                                                <input type="date" id="dateFrom" placeholder="01.01.10"
                                                       className="text"/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="dateTo">To</label>
                                                <input type="date" id="dateTo" placeholder="01.01.23" className="text"/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="stock">Stock</label>
                                                <input type="text" id="stock" placeholder="APPL" className="text"/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="amount">Amount $</label>
                                                <input type="text" id="amount" placeholder="200" className="text"/>
                                            </div>
                                            <div className="input__container">
                                                <label htmlFor="period">Period</label>
                                                <input type="number" id="period" placeholder="5" className="text"/>
                                            </div>
                                            <button type="submit" className="button form__button correlation__button"
                                                    id="statsBtn">
                                                Calculate
                                            </button>
                                        </form>
                                    </div>
                                    <div className="correlation__chart">
                                    </div>
                                </div>
                                <div className="correlation__info">
                                    <div className={styleStat.stock__info}>
                                        <h3 className={styleStat.stock__symbol}>APPL</h3>
                                        <h4 className={styleStat.stock__name}>NasdaqGS - NasdaqGS Real Time Price. Currency in
                                            USD</h4>
                                        <div className={styleStat.price__now}>
                                            <span className={styleStat.prise}>157.66</span>
                                            <span className={styleStat.chg}>+0.26</span>
                                            <span className={styleStat.chg}>(+0.2%)</span>
                                        </div>
                                        <p className="min_prise">Min.price: 132.2</p>
                                        <p className="min_prise">Max.price: 161.30</p>
                                    </div>

                                    <div className={styleStat.stock__info}>
                                        <h3 className={styleStat.stock__symbol}>Gold</h3>
                                        <h4 className={styleStat.stock__name}>COMEX - COMEX Delayed Price. Currency in USD
                                        </h4>
                                        <div className={styleStat.price__now}>
                                            <span className={styleStat.prise}>1,943.90</span>
                                            <span className={`${styleStat.chg} ${styleStat.red}`}>-38.90</span>
                                            <span className={`${styleStat.chg} ${styleStat.red}`}>(-1.96%)</span>
                                            <p className="min_prise">Min.price: 1,726.25</p>
                                            <p className="min_prise">Max.price: 2002.10</p>
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