import React, {useEffect, useState} from 'react';
import {account, navItems, navItemsAccount} from "../../utils/constants";
import Home from "./Home";
import Statistics from "./Statistics";
import Analytics from "./Analytics";
import Contacts from "./Contacts";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Guest from "./Account/Guest";
import Profile from "./Account/Profile";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../actions/accoutAction";
import ForgotPassword from "./Account/ForgotPassword";
import {fetchTickers} from "../../actions/tickersAction";

const Main = () => {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const [token, setToken] = useState('');

    useEffect(() => {
        const token2 = sessionStorage.getItem('token');
        if (token2) {
            dispatch(fetchUser(token2));
            // setToken(token2)
            dispatch(fetchTickers());
        }
    }, []);

    useEffect(() =>{
        navigate(JSON.parse(sessionStorage.getItem('lastRoute') || '{}'))
        window.onbeforeunload = () => {
            window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
        }
    }, [])

    return (
            // {user.messagePassword ? <Guest/> : (
        <>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={navItems[0].route} element={<Home/>}/>
                <Route path={navItems[1].route} element={token ? <Statistics/> : <Navigate to={'/guest'}/>}/>
                <Route path={navItems[2].route} element={token ? <Analytics/> : <Navigate to={'/guest'}/>}/>
                <Route path={navItems[3].route} element={<Contacts/>}/>
                <Route path={account[0].route} element={token ? <Navigate to={'/profile'}/> : <Guest/>}/>
                <Route path={`${account[1].route}/*`} element={token ? <Profile/> : <Navigate to={'/guest'}/>}/>
                <Route path={`${account[0].route}/forgotPassword`} element={<ForgotPassword/>}/>
                <Route path={'*'} element={<ErrorPage/>}/>
            </Routes>
        </>
            // )}

    )
};

export default Main;