import email from '../Images/email.png'
import support from '../Images/support.png'
import address from '../Images/address.png'
import {fetchPrice} from "../actions/priceAction";

export const navItems = [
    {title: "Home", route: "home"},
    {title: "Statistics", route: "statistics"},
    {title: "Analytics", route: "analytics"},
    {title: "Contacts", route: "contacts"}];

export const contactsImages = [email, support, address];

export const baseUrl = 'https://ticker-statistic.fly.dev';
export const baseUrl8080 = 'http://localhost:8080';

export const randomNum = (tickers) => {
    const random = [];
    for (let i = 0; i < tickers.length; i++ ) {
        random.push(i);
    }
    console.log(random);
    console.log("===========")
    return random;
}

