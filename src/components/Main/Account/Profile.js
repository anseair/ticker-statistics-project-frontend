import ProfileData from "./ProfileData";
import React from "react";

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
            </section>
        </>
    );
};
export default Profile;