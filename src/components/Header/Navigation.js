import React, {useState} from 'react';
import {navItems} from "../../utils/constants";
import NavItem from "./NavItem";
import '../../CSS/header.css'
import Login from "../Main/Login";
import Register from "../Main/Register";
import {Link} from "react-router-dom";
import {deleteToken} from "../../slices/tokenSlice";
import {deleteUser} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import Profile from "../Main/Profile";

const Navigation = () => {
    const {login} = useSelector(state => state.user);

    const token = useSelector(state => state.token);

    const dispatch = useDispatch();
    const handleClickLogout = () => {
        dispatch(deleteToken());
        dispatch(deleteUser());
    }

    return (
        <nav className="navbar fixed-top">
            <div className="header__container">
                <span className="logo">Stock
                    <span className="logo__part--them-light">Stat</span>
                </span>
                <ul className="navigation__list">
                    {navItems.map(i => <NavItem key={i.route} item={i}/>)}
                </ul>
                <ul className="header__contact">
                    <li>oll@investing.com</li>
                    <li>+972 53 111111</li>
                </ul>
                <div className="dropdown">
                    {token &&
                        <button className="button form__button correlation__button">
                            {token ? `${login}` : 'Sing In'}
                            <div className="dropdown-content">
                                <Link to={"guest"} onClick={handleClickLogout}>LOG OUT</Link>
                            </div>
                        </button>
                    }
                    {!token &&
                        <Link className="link button form__button correlation__button" to={"guest"}>Sing in</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navigation;