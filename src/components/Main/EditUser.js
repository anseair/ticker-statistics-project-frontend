import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchUpdateUser} from "../../actions/accoutAction";

const EditUser = ({close}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useDispatch();

    const handleClickSave = () => {
        dispatch(fetchUpdateUser(firstName, lastName));
        close();
    }

    const handleClickClear = () => {
        setFirstName('');
        setLastName('');
    }

    return (
        <div className="profile__form">
            <h4>Edit user profile</h4>
            <div className="input__container">
                <label htmlFor="firstName">First name:</label>
                <input type="text" id="firstName" placeholder="Your new first name" className="text"
                       onChange={e => setFirstName(e.target.value.trim())} value={firstName}/>
            </div>
            <div className="input__container">
                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" placeholder="Your new last name" className="text"
                       onChange={e => setLastName(e.target.value.trim())} value={lastName}/>
            </div>

            <button className="button w-100" onClick={handleClickSave}>Save and Close</button>
            <button className="button w-100" onClick={handleClickClear}>Clear</button>
            <button className="button w-100" onClick={close}>Close without Save</button>
        </div>
    );
};

export default EditUser;