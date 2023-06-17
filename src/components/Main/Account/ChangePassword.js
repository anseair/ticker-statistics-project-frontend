import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchChangePassword} from "../../../actions/accoutAction";

const ChangePassword = ({close}) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const dispatch = useDispatch();

    const handleClickSave = () => {
        if(newPassword === newPassword2){
            dispatch(fetchChangePassword(newPassword));
        }
        close();
    }

    const handleClickClear = () => {
        setPassword('');
        setNewPassword('');
        setNewPassword2('');
    }

    return (
        <div className="profile__form">
            <div className="input__container">
                <label htmlFor="password">Old password:</label>
                <input type="password" id="password" placeholder="Your old password" className="text"
                       onChange={e => setPassword(e.target.value.trim())} value={password}/>
            </div>
            <div className="input__container">
                <label htmlFor="newPassword">New password:</label>
                <input type="password" id="newPassword" placeholder="Your new password" className="text"
                       onChange={e => setNewPassword(e.target.value.trim())} value={newPassword}/>
            </div>
            <div className="input__container">
                <label htmlFor="repeatNewPassword">Repeat new password:</label>
                <input type="password" id="repeatNewPassword" placeholder="Your new password" className="text"
                       onChange={e => setNewPassword2(e.target.value.trim())} value={newPassword2}/>
            </div>
            <button className="button w-30 m-1" onClick={handleClickClear}>Clear</button>
            <button className="button w-30 m-1" onClick={handleClickSave}>Save</button>
            <button className="button w-30 m-1" onClick={close}>Cancel</button>
        </div>
    );
};

export default ChangePassword;