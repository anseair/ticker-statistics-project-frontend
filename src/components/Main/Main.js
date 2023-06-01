import React from 'react';
import {account,navItems} from "../../utils/constants";
import Home from "./Home";
import Statistics from "./Statistics";
import Analytics from "./Analytics";
import Contacts from "./Contacts";
import {Navigate, Route, Routes} from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Guest from "./Guest";
import Profile from "./Profile";
import {useSelector} from "react-redux";


const Main = () => {
    const token = useSelector(state => state.token);
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={navItems[0].route} element={<Home/>}/>
            <Route path={navItems[1].route} element={<Statistics/>}/>
            <Route path={navItems[2].route} element={<Analytics/>}/>
            <Route path={navItems[3].route} element={<Contacts/>}/>
            <Route path={'/guest'} element={token ? <Navigate to={'/profile'}/> : <Guest/>}/>
            <Route path={'/profile'} element={token ? <Profile/> : <Navigate to={'/guest'}/>}/>
            <Route path={'*'} element={<ErrorPage/>}/>
        </Routes>
    )
};

export default Main;