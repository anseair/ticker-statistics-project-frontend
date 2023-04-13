import React from 'react';
import {navItems} from "../../utils/constants";
import NavItem from "./NavItem";
import '../../CSS/header.css'

const Navigation = () => {
    return (
        <nav className="navbar fixed-top">
            <div className="header__container">
                <span className="logo">Stock
                    <span className="logo__part--them-light">Stat</span>
                </span>
                <ul className="navigation__list">
                    {navItems.map(i => <NavItem key={i.route} item={i} />)}
                </ul>
                <ul className="header__contact">
                    <li>oll@investing.com</li>
                    <li>+972 53 111111</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;