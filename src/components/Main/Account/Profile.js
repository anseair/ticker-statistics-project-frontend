import React, {useState} from "react";
import {navItemsAccount} from "../../../utils/constants";
import SideBarAccount from "./SideBarAccount";
import HomeAccount from "./HomeAccount";
import {addTicker, deleteTicker} from "../../../slices/tickersSlice";
import {useDispatch, useSelector} from "react-redux";

const Profile = () => {
    const [currentPage, setCurrentPage] = useState(navItemsAccount[0]);

    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1>Profile</h1>
                </div>
            </section>
            <section className="profile container-fluid">
                <div className="row flex-nowrap w-auto">
                    <div className="col-3 px-2 m-3">
                        <SideBarAccount currentPage={setCurrentPage}/>
                    </div>
                    <div className="col-7 py-3 m-3">
                        <HomeAccount currentPage={currentPage}/>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Profile;