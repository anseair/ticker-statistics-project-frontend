import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchDeleteUser} from "../../../actions/accoutAction";
import {createToken} from "../../../utils/constants";

const DeleteAccount = () => {
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleClickDelete = () => {
        if (createToken(user.user.login, password) === token){
            dispatch(fetchDeleteUser(createToken(user.user.login, password)));
        }
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
            {user.message &&
                <div class="alert alert-info alert-dismissible">
                    {user.message}
                </div>
            }
            <h5>Delete account</h5>
            <div className="profile__form">
                <div className="input__container">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Your password" className="text"
                           onChange={e => setPassword(e.target.value.trim())} value={password}/>
                    <div className="input__container">
                        <input type="checkbox" className="w-auto mx-1" onClick={showPassword}/>Show password
                    </div>
                </div>
                <button className="button form__button m-1" onClick={handleClickDelete}>Delete account</button>
            </div>
        </>
    );
};

export default DeleteAccount;