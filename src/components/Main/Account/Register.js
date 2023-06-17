import React, {useState} from 'react';
import {fetchRegisterUser} from "../../../actions/accoutAction";
import {useDispatch} from "react-redux";

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const handleClickRegister = () => {
        dispatch(fetchRegisterUser({login, password, firstName, lastName}));
    }

    return (
        <>
                <div className="account__form">
                    <h4>Create account StockStat</h4>
                    <div className="input__container">
                        <label htmlFor="login">Login:</label>
                        <input type="text" id="login" placeholder="Your login" required className="text"
                               onChange={e => setLogin(e.target.value.trim())} value={login}/>
                    </div>
                    <div className="input__container">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Your password" required className="text"
                               onChange={e => setPassword(e.target.value.trim())} value={password}/>
                    </div>
                    {/*<div className="input__container">*/}
                    {/*    <label htmlFor="email">Email:</label>*/}
                    {/*    <input type="email" id="email" placeholder="Your email" required className="text"*/}
                    {/*           onChange={e => setEmail(e.target.value.trim())} value={email}/>*/}
                    {/*</div>*/}
                    <div className="input__container">
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" id="firstName" placeholder="Your first name" required className="text"
                               onChange={e => setFirstName(e.target.value.trim())} value={firstName}/>
                    </div>
                    <div className="input__container">
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" id="lastName" placeholder="Your last name" required className="text"
                               onChange={e => setLastName(e.target.value.trim())} value={lastName}/>
                    </div>
                    <button className="button form__button w-100" onClick={handleClickRegister}>Register</button>
                </div>
        </>
    );
};

export default Register;