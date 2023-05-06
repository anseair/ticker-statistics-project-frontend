import React from 'react';
import Hero from "./Hero";
import Services from "./Services";
import Correlation from "./Correlation";
import Statistic from "./Statistic";
import StockApi from "./StockApi";

const Home = () => {
    return (
        <main>
            <Hero/>
            <Services/>
            <Correlation/>
            <Statistic/>
            <StockApi/>
        </main>
    );
};

export default Home;