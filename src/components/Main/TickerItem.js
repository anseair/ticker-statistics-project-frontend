import React from 'react';

const TickerItem = ({ticker}) => {
    return (
            <option value={ticker}>{ticker}</option>
    );
};

export default TickerItem;