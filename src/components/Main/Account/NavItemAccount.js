import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavItemAccount = ({item}) => {
    return (
        <NavLink className="dropdown">
            <Link className="RouterNavLink" to={item.route}>{item.title}</Link>
        </NavLink>
    );
};

export default NavItemAccount;