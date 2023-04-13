import React from 'react';
import Hero from "./Hero";
import Services from "./Services";
import Correlation from "./Correlation";
import Statistic from "./Statistic";
import Api from "./Api";

const Home = () => {
    return (
        <main>
            <Hero/>
            <Services/>
            <Correlation/>
            <Statistic/>
            <Api/>
        </main>
    );
};

export default Home;