import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUpdateUser} from "../../../actions/accoutAction";

const ProfileData = () => {
    const user = useSelector(state => state.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }, []);

    const handleClickSave = () => {
        dispatch(fetchUpdateUser(firstName, lastName));
    }

    const handleClickCancel = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }

    return (
        <>
            {user.message &&
                <div className="alert alert-info alert-dismissible">
                    {user.message}
                </div>
            }

            <div className="row">
                <h5>CONTACT INFORMATION</h5>
                <div className="col-6">
                    <p>FIRST NAME:</p>
                    <input type="text" required className="text-start"
                           onChange={e => setFirstName(e.target.value.trim())} value={firstName}/>
                </div>
                <div className="col-sm-6">
                    <p>LAST NAME:</p>
                    <input type="text" required className="text-start"
                           onChange={e => setLastName(e.target.value.trim())} value={lastName}/>
                </div>
            </div>
            <div>
                <p>Country:</p>
                <input type="text" required className="text-start"/>
            </div>
            <div>
                <p>Address:</p>
                <input type="text" required className="text-start"/>
            </div>
            <div>
                <p>Town/City:</p>
                <input type="text" required className="text-start"/>
            </div>
            <div className="d-flex justify-content-end">
                <button className="button form__button me-1" onClick={handleClickSave}>Save changes
                </button>
                <button className="button form__button" onClick={handleClickCancel}>Cancel</button>
            </div>
            <ul>CURRENT ROLES:
                {user.roles.map(r => <li className="text-muted w-400" key={r}> - {r}</li>)}
            </ul>
        </>
    );
};

export default ProfileData;