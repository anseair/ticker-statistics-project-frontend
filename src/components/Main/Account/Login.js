import React, {useEffect, useState} from 'react';
import {createToken} from "../../../utils/constants";
import {fetchForgotPassword, fetchUser} from "../../../actions/accoutAction";
import {useDispatch, useSelector} from "react-redux";
import '../../../CSS/account.css'
import {Link} from "react-router-dom";

const Login = () => {
    const {message} = useSelector(store => store.user);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleClickLogin = () => {
        dispatch(fetchUser(createToken(login, password)));
    }

    const showPassword = () => {
        let input = document.getElementById('password');
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }

    return (
        <>
            <div className="account__form">
                <h4>Sing in to StockStat</h4>
                <div className="input__container ">
                    <label htmlFor="login">Login:</label>
                    <input type="text" id="login" placeholder="Your login" required className="text"
                           onChange={e => setLogin(e.target.value.trim())} value={login}/>
                </div>
                <div className="input__container mb-0">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Your password" required className="text"
                           onChange={e => setPassword(e.target.value.trim())} value={password}/>
                </div>
                <div className="input__container">
                    <input type="checkbox" className="w-auto mx-1" onClick={showPassword}/>Show password
                </div>
                {message &&
                    <p>{message}</p>
                }
                <Link className="link m-1 border-0" to={"forgotPassword"}>Forgot password?</Link>
                <button className="button form__button float-end m-0" onClick={handleClickLogin}>Log in</button>
            </div>
        </>
    );
};

export default Login;