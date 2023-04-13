import React from 'react';
import CorrelationForm from "./CorrelationForm";

const CorrelationBox = () => {
    return (
        <div className="correlation__box">
            <CorrelationForm/>
            <div className="correlation__chart"></div>
        </div>
    );
};

export default CorrelationBox;