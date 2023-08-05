import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchChangePassword} from "../../../actions/accoutAction";
import {createToken} from "../../../utils/constants";

const ChangePassword = () => {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    const handleClickSave = () => {
        if (createToken(user.user.login, password) === token) {
            if (password !== newPassword) {
                if (newPassword === newPassword2) {
                    dispatch(fetchChangePassword(newPassword));
                } else {
                    setMessage("Password has not been successfully changed. Passwords don't match");
                    handleClickCancel();
                }
            } else {
                setMessage("Password has not been successfully changed. Old password and new password must different");
                handleClickCancel();
            }
        } else{
            setMessage("Password has not been successfully changed. Old password is invalid");
            handleClickCancel();
        }
    }

    const handleClickCancel = () => {
        setPassword('');
        setNewPassword('');
        setNewPassword2('');
    }

    const closeAlert = () => {
        setMessage('');
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
            {message &&
                <div className="alert alert-info alert-dismissible">
                    <button className="btn-close" onClick={closeAlert}></button>
                    {message}
                </div>
            }
            <h5>Change password</h5>
            <div className="profile__form">
                <div className="input__container">

                    <label htmlFor="password">Old password:</label>
                    <input type="password" id="password" placeholder="Your old password" className="text"
                           onChange={e => setPassword(e.target.value.trim())} value={password}/>
                    <div className="input__container">
                        <input type="checkbox" className="w-auto mx-1" onClick={showPassword}/>Show password
                    </div>
                </div>
                <div className="input__container">
                    <label htmlFor="newPassword">New password:</label>
                    <input type="password" id="newPassword" placeholder="Your new password" className="text"
                           onChange={e => setNewPassword(e.target.value.trim())} value={newPassword}/>
                    <div className="input__container">
                        <input type="checkbox" className="w-auto mx-1" onClick={showPassword}/>Show password
                    </div>
                </div>
                <div className="input__container">
                    <label htmlFor="repeatNewPassword">Repeat new password:</label>
                    <input type="password" id="repeatNewPassword" placeholder="Your new password"
                           className="text"
                           onChange={e => setNewPassword2(e.target.value.trim())} value={newPassword2}/>
                    <div className="input__container">
                        <input type="checkbox" className="w-auto mx-1" onClick={showPassword}/>Show password
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="button form__button" onClick={handleClickCancel}>Cancel</button>
                    <button className="button form__button m-1" onClick={handleClickSave}>Save</button>
                </div>
            </div>

        </>
    );
};

export default ChangePassword;