import email from '../Images/email.png'
import support from '../Images/support.png'
import address from '../Images/address.png'

export const navItems = [
    {title: "Home", route: "home"},
    {title: "Statistics", route: "statistics"},
    {title: "Analytics", route: "analytics"},
    {title: "Contacts", route: "contacts"},
];
export const account = [
    {title: "Guest", route: "guest"},
    {title: "Profile", route: "profile"}
];

export const contactsImages = [email, support, address];

export const baseUrl = 'https://ticker-statistic.fly.dev';
export const baseUrl8080 = 'http://localhost:8080';

export const randomNum = (tickers) => {
    const arr = [];
    const res = [];
    for(let i = 0; i < tickers.length; i++) {
        arr.push(i);
    };
    for(let i = 1; i < tickers.length+1; i++) {
        const value = arr.splice(Math.floor(Math.random() * (tickers.length-i-1) + 1),1);
        res.push(tickers[value.pop()]);
    };
    return res;
}

export const names = (ticker) => {
    switch (ticker){
        case "AAPL":
            return ('Apple Inc. (AAPL)')
        case "AMZN":
            return 'Amazon.com, Inc. (AMZN)';
        case "GOOG":
            return 'Alphabet Inc. (GOOG)';
        case "INTC":
            return 'Intel Corporation (INTC)';
        case "MSFT":
            return 'Microsoft Corporation (MSFT)';
        case "TSLA":
            return 'Tesla, Inc. (TSLA)';
        case "^GSPC":
            return 'S&P 500 (^GSPC)';
        default:
            return ""
    }
}

export const createToken = (login, password) => `Basic ${window.btoa(login+ ':' + password)}`;


export const dateStr = (date) => {
    let year = date.getFullYear();
    let day = '' + date.getDate();
    let month = '' + (date.getMonth() + 1);
    if (day.length < 2) {
        day = '0' + day;
    }
    if (month.length < 2) {
        month = '0' + month;
    }
    const dateStr = `${year}-${month}-${day}`;
    return dateStr;
}
