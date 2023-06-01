import ProfileData from "./ProfileData";
import React from "react";
import {UpdateUser} from "./UpdateUser";

const Profile = () => {
    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1>Profile</h1>
                </div>
            </section>
            <section className="profile">
                <ProfileData/>
                <UpdateUser/>
            </section>
        </>
    );
};
export default Profile;