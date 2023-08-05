import React, {useState} from 'react';
import {fetchForgotPassword} from "../../../actions/accoutAction";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const handleClickSendToEmail = () => {
        dispatch(fetchForgotPassword(email));
    }

    return (
        <section className="account">
            <div className="account__form pb-5">
                <h4>Forgot password</h4>
                {user.message &&
                    <div className="alert alert-info p-3">
                        {user.message}
                        {/*<p>We have sent a reset password link to your email. Please check.</p>*/}
                    </div>
                }
                <p className="m-3">We will be sending a reset password link to your email</p>
                <div className="input__container mb-3">
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" id="login" placeholder="Your e-mail" required className="text"
                           onChange={e => setEmail(e.target.value.trim())} value={email}/>
                </div>
                <Link className="link button form__button m-1 border-0" to={"../guest"}>Log in</Link>
                <button className="button form__button float-end m-0 border-0" onClick={handleClickSendToEmail}>Send</button>
            </div>
        </section>
    );
};

export default ForgotPassword;