import React, {useState} from 'react';
import {createToken} from "../../../utils/constants";
import {fetchUser} from "../../../actions/accoutAction";
import {useDispatch, useSelector} from "react-redux";
import '../../../CSS/account.css'

const Login = () => {
    const {message} = useSelector(store => store.user);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleClickLogin = () => {
        dispatch(fetchUser(createToken(login, password)));
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
                <div className="input__container ">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Your password" required className="text"
                           onChange={e => setPassword(e.target.value.trim())} value={password}/>
                </div>
                {message &&
                    <p>{message}</p>
                }
                <button className="button form__button w-100" onClick={handleClickLogin}>Log in</button>
            </div>
        </>
    );
};

export default Login;