import React, {useEffect, useState} from 'react';
import {navItemsAccount} from "../../../utils/constants";
import {Navigate, Route, Routes} from "react-router-dom";
import ProfileData from "./ProfileData";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../../actions/accoutAction";
import {fetchTickers} from "../../../actions/tickersAction";
const HomeAccount = () => {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    // const [token, setToken] = useState('');

    useEffect(() => {
        const token2 = sessionStorage.getItem('token');
        console.log(token2)
        if (token2) {
            dispatch(fetchUser(token2));
            // setToken(token2)
            dispatch(fetchTickers());
        }

    }, [])

    return (
        <div>
            <Routes>
                <Route path={'/'} element={token ? <ProfileData/> : <Navigate to={'/guest'}/>}/>
                <Route path={`/${navItemsAccount[1].route}`} element={token ? <ChangePassword/> : <Navigate to={'/guest'}/>}/>
                <Route path={`/${navItemsAccount[2].route}`} element={token ? <DeleteAccount/> : <Navigate to={'/guest'}/>}/>
            </Routes>
        </div>
    );
};


export default HomeAccount;