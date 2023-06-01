import {useState} from "react";
import EditUser from "./EditUser";
import ChangePassword from "./ChangePassword";


export const UpdateUser = () => {
    const[updateUser, setUpdateUser] = useState('');
    const close = () => setUpdateUser('');

    switch (updateUser) {
        case 'editUser':
            return <EditUser close={close}/>;
        case 'changePassword':
            return <ChangePassword close={close}/>;
        default:
            return (
                <div>
                    <button className="button form__button switchLoginRegister" onClick={() => setUpdateUser('editUser')}>Edit user profile</button>
                    <button className="button form__button switchLoginRegister" onClick={() => setUpdateUser('changePassword')}>Change password</button>
                </div>
            );
    }

}