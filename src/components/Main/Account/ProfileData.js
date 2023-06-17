import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTickers} from "../../../actions/tickersAction";
import {addTicker, deleteTicker} from "../../../slices/tickersSlice";
import {UpdateUser} from "./UpdateUser";

const ProfileData = () => {
    const user = useSelector(state => state.user);
    const {tickers, selectedTickers} = useSelector(state => state.tickers);
    const dispatch = useDispatch();
    const [ticker, setTicker] = useState('');

    useEffect(()=> {
        dispatch(fetchTickers());
    }, []);

    const handleChange = (e) => {
        const ticker = e.target.value;
        setTicker(ticker);
    }

    const handleClickAddTicker = () => {
        if (selectedTickers.findIndex(t => t === ticker) >= 0) {
            alert(`Ticker already exists`);
        } else{
            dispatch(addTicker(ticker));
        }
    }

    return (
        <div>
            <p>LOGIN: {user.login}</p>
            <p>FIRST NAME: {user.firstName}</p>
            <p>LAST NAME: {user.lastName}</p>
            {/*<p>Email: {user.email}</p>*/}
            <ul>CURRENT ROLES:
                {user.roles.map(r => <li key={r}> - {r}</li>)}
            </ul>
            <UpdateUser/>
            <p>CHOOSE SYMBOL FOR ADD:</p>
            <select className="profile__select" onChange={handleChange} value={ticker}>
                <option value='' disabled hidden>Select ticker</option>
                {tickers.map((t) => {
                        return <option key={t} value={t}>{t}</option>
                    }
                )}
            </select>
            <button className="button form__button m-2" onClick={handleClickAddTicker}>ADD</button>
            <ul>SYMBOLS:
                {selectedTickers.map((ticker, i) => {
                    return <li key={i}> * {ticker}
                        <button className="button form__button m-1" onClick={() => dispatch(deleteTicker(ticker))}>DELETE</button>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default ProfileData;