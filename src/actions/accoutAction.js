import {putUser} from "../slices/userSlice";
import {putToken} from "../slices/tokenSlice";
import {baseUrl, createToken} from "../utils/constants";
export const fetchRegisterUser = (user) => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl}/account/register`, {
            method: 'Post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(putUser(data));
            dispatch(putToken(createToken(user.login, user.password)));
        } else {
            throw new Error(response.status.toString());
        }
    }
}
export const fetchUser = (token) => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl}/account/login`, {
            method: 'Post',
            headers: {
                'Authorization': token
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            dispatch(putUser(data));
            dispatch(putToken(token));
        } else {
            throw new Error(response.status.toString());
        }
    }
}

export const fetchUpdateUser = (firstName, lastName) => {
    return async (dispatch, getState) => {
        const response = await fetch(`${baseUrl}/user/`, {
            method: 'Put',
            body: JSON.stringify({firstName, lastName}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().token
            }
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(putUser(data));
        } else {
            throw new Error(response.status.toString());
        }
    }
}
export const fetchChangePassword = (password) => {
    return async (dispatch, getState) => {
        const response = await fetch(`${baseUrl}/user/password`, {
            method: 'Put',
            headers: {
                'Authorization': getState().token,
                'X-Password': password
            }
        });
        if (response.ok) {
            dispatch(putToken(createToken(getState().user.login, password)));
        } else {
            throw new Error(response.status.toString());
        }
    }
}

