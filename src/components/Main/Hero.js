import React from 'react';
import style from '../../CSS/hero.module.css'

const Hero = () => {
    return (
        <section className={style.hero}>
            <div className="d-block">
                <h3 className={style.hero__subtitle}>Make Informed Investment Decisions with Data Analysis</h3>
                <h1 className={style.hero__title}>Build Your Ideal Investment Portfolio</h1>

                <button className="button">get Started</button>
            </div>
        </section>
    );
};

export default Hero;