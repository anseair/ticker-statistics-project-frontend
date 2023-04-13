import React from 'react';
import img from '../../Images/digital-marketing-1725340.jpg'
import style from '../../CSS/api.module.css'

const Api = () => {
    return (
        <section className={style.api}>
            <div className={style.api_image}><img src={img} alt="town"/></div>
            <div className={style.api__content}>
                <h5 className={`${style.api__subtitle}`}>Latest Stock Market Information</h5>
                <h3 className={`${style.api__title}`}>Real-Time Stock Price Data API</h3>
                <div className={style.api__relative}>
                    <p className={style.api__text}>By choosing our API, you can save valuable time and effort on data
                        collection and
                        analysis, and focus on making smart investment decisions based on actual data. Our API is
                        reliable,
                        accurate, and easy to use, making it an essential tool for investors, traders, and analysts who
                        want to
                        stay ahead of the game.</p>
                    <p className={style.api__text}>Invest in our stock analysis API today and take advantage of the power of
                        real-time
                        data and in-depth analysis to achieve your investment goals.</p>
                    <p className={style.api__text}>For more information on our stock market analysis API, please don't
                        hesitate to contact
                        us. </p>
                </div>
                <p className={`${style.api__text} ${style.tel}`}>+972 53 111111</p>
                <p className={`${style.api__text} ${style.tel}`}>Link to file README on github </p>

            </div>
        </section>
    );
};

export default Api;