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
                <>
                    <button className="button form__button m-1" onClick={() => setUpdateUser('editUser')}>Edit user profile</button>
                    <button className="button form__button m-1" onClick={() => setUpdateUser('changePassword')}>Change password</button>
                </>
            );
    }

}