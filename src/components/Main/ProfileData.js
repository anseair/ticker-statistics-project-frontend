import React from 'react';
import {useSelector} from "react-redux";

const ProfileData = () => {
    const user = useSelector(state => state.user)
    return (
        <div>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>Roles:
                {user.roles.map(r => <li key={r}>{r}</li>)}
            </ul>
        </div>
    );
};

export default ProfileData;