import React from 'react';
import style from '../../CSS/priceData.module.css'
import diagram from "../../Videos/diagram.mp4";

const PriceData = () => {
    return (
        <section className={style.priceData} id="stockApi">
            <div className={style.priceData__content}>
                <h5 className={`${style.priceData__subtitle}`}>Latest Stock Market Information</h5>
                <h3 className={`${style.priceData__title}`}>Stock Price Data</h3>
                <div className={style.priceData__relative}>
                    <video width="1000" height="500" controls muted  autoPlay loop>
                        <source src={diagram} type="video/mp4"/>
                    </video>
                </div>
            </div>
        </section>
    );
};

export default PriceData;