import React from 'react';
import {names} from "../../utils/constants";
import styleStat from "../../CSS/stat.module.css";
import moment from "moment";

const TickerForInvestmentPortfolio = ({name, priceClose, change, changePersent, date, maxPrice, minPrice}) => {

    return (
        <div className="ticker mx-3 mb-2">
                <>
                    <p className={styleStat.stock__name}>{name}
                    </p>
                    <div className={styleStat.price__now}>
                        <span className={styleStat.prise__analytic}>{priceClose}</span>
                        <span className={change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{change}</span>
                        <span className={changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({changePersent})%</span>
                        <p>At close: {moment(date).format("D MMM. YYYY")}</p>
                        <p>High/low for 52 week: <span
                            className="fw-bold">{maxPrice} / {minPrice}</span></p>
                    </div>
                </>

        </div>
    );
};

export default TickerForInvestmentPortfolio;