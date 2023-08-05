import React, {useEffect, useState} from 'react';
import {navItemsAccount} from "../../../utils/constants";
import NavItemAccount from "./NavItemAccount";
import {useSelector} from "react-redux";

const SideBarAccount = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            <div className="text-center">
                <p>{(user.user.login).toUpperCase()}</p>
                <p>{user.user.email}</p>
                <hr className="m-0"/>
            </div>
            <div className="d-flex flex-column align-items-start">
                <div className="navbar navbar-inverse navbar-fixed-left ">
                    <ul className="nav navbar-nav">
                        {navItemsAccount.map(i => <NavItemAccount key={i.route} item={i}/>)}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBarAccount;