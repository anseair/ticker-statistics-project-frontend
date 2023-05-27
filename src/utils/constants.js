import email from '../Images/email.png'
import support from '../Images/support.png'
import address from '../Images/address.png'
import {fetchPrice} from "../actions/priceAction";
import * as string_decoder from "string_decoder";

export const navItems = [
    {title: "Home", route: "home"},
    {title: "Statistics", route: "statistics"},
    {title: "Analytics", route: "analytics"},
    {title: "Contacts", route: "contacts"}];

export const contactsImages = [email, support, address];

export const baseUrl = 'https://ticker-statistic.fly.dev';
export const baseUrl8080 = 'http://localhost:8080';

export const randomNum = (tickers) => {
    const arr = [];
    const res = [];
    for(let i = 0; i <= tickers.length; i++) {
        arr.push(i);
    };
    for(let i = 0; i <= 3; i++) {
        const value = arr.splice(Math.floor(Math.random() * ((4-i) - 1) + 1),1);
        console.log(value)
        res.push(tickers[value.pop()]);
    };
    console.log(res);
    return res;
}

export const names = (ticker) => {
    switch (ticker){
        case "AAPL":
            return 'Apple Inc. (AAPL)'
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
