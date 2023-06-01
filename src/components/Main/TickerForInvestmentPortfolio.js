import React from 'react';
import {names} from "../../utils/constants";
import styleStat from "../../CSS/stat.module.css";

const TickerForInvestmentPortfolio = ({name, price, change, changePersent}) => {

    return (
        <div className="ticker">
                <>
                    <h3 className={styleStat.stock__name}>{names(name)}</h3>
                    <p>NasdaqGS - NasdaqGS Real Time Price. Currency in USD</p>
                    <div className={styleStat.price__now}>
                        <span className={styleStat.prise}>{price}</span>
                        <span className={change < 0 ? styleStat.chgRed : styleStat.chgGreen}>{change}</span>
                        <span className={changePersent < 0 ? styleStat.chgRed : styleStat.chgGreen}>({changePersent})%</span>
                    </div>
                </>

        </div>
    );
};

export default TickerForInvestmentPortfolio;