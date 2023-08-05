import React from 'react';
import Hero from "./Hero";
import Services from "./Services";
import Correlation from "./Correlation";
import Statistic from "./Statistic";
import PriceData from "./PriceData";

const Home = () => {
    return (
        <main>
            <Hero/>
            <Services/>
            <Correlation/>
            <Statistic/>
            <PriceData/>
        </main>
    );
};

export default Home;