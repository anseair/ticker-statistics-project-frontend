import React from 'react';
import correlation from "../../Videos/correlation.mp4";

const Correlation = () => {
    return (
        <section className="correlation" id="correlation">
            <div className="correlation__container">
                <h5 className="correlation__subtitle">Analyze the Relationship Between Two Stocks</h5>
                <h3 className="correlation__title">Assessing the Dependence of Two Stocks</h3>
                <p className="correlation__text">Discover the correlation coefficient between any two stocks with our
                    easy-to-use
                    calculator. Make informed investment decisions based on the data-driven analysis of stock market
                    trends</p>
                <video width="1000" height="500" controls muted  autoPlay loop>
                    <source src={correlation} type="video/mp4"/>
                </video>
            </div>
        </section>
    );
};

export default Correlation;