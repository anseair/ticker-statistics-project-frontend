import React, {useState} from 'react';
import {fetchRegisterUser} from "../../../actions/accoutAction";
import {useDispatch, useSelector} from "react-redux";

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const user = useSelector(state => state.user);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const handleClickRegister = () => {
        if (checkPasswordValidity(password) && checkEmailValidity(email) && checkLoginValidity(login)
            && checkNameValidity(firstName) && checkNameValidity(lastName)) {
            dispatch(fetchRegisterUser({user: {login, email}, password, firstName, lastName}));
        }
    }

    const checkPasswordValidity = (value) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            setMessage("Password must not contain Whitespaces.");
            return false;
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            setMessage("Password must have at least one uppercase character.");
            return false;
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            setMessage("Password must have at least one lowercase character.");
            return false;
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            setMessage("Password must contain at least one digit.");
            return false;
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            setMessage("Password must be 8-16 characters long.");
            return false;
        }
        return true;
    }

    const checkEmailValidity = (value) => {
        const patternEmail = /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
        if (!patternEmail.test(value)) {
            setMessage("Email is not valid. Please enter a valid email address.");
            return false;
        }
        return true;
    }

    const checkLoginValidity = (value) => {
        const patternLogin = /^\w{2,}/
        if (!patternLogin.test(value)) {
            setMessage("Login is not valid. Please enter a valid login");
            return false;
        }
        return true;
    }

    const checkNameValidity = (value) => {
        const patternName = /^['a-zA-Z-']+$/
        if (!patternName.test(value)) {
            setMessage("Name is not valid. Please enter a valid name");
            return false;
        }
        return true;
    }

    const showPassword = () => {
        let input = document.getElementById('password');
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }

    const closeAlert = () => {
        setMessage('');
    }

    return (
        <>
            <div className="account__form">
                <h4>Create account StockStat</h4>
                {user.message &&
                    <div className="alert alert-info p-3">
                        {user.message}
                    </div>
                }
                {message &&
                    <div className="alert alert-info alert-dismissible">
                        <button className="btn-close" onClick={closeAlert}></button>
                        {message}
                    </div>
                }
                <div className="input__container">
                    <label htmlFor="login">Login:</label>
                    <input type="text" id="login" placeholder="Your login" required className="text"
                           onChange={e => setLogin(e.target.value.trim())} value={login}/>
                </div>
                <div className="input__container">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Your email" required className="text"
                           onChange={e => setEmail(e.target.value.trim())} value={email}/>
                </div>
                <div className="input__container">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Your password" required className="text"
                           onChange={e => setPassword(e.target.value.trim())} value={password}/>
                    <div className="input__container">
                        <input type="checkbox" className="w-auto mx-1" onClick={showPassword}/>Show password
                    </div>
                </div>
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