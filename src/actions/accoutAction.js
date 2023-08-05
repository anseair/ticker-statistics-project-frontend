import {closeMessage, deleteUser, putMessage, putUser} from "../slices/userSlice";
import {deleteToken, putToken} from "../slices/tokenSlice";
import {baseUrl, createToken} from "../utils/constants";
import React from "react";

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
            if (response.status === 409){
                dispatch(putMessage("User already exists"))
                setTimeout(() => {
                    dispatch(closeMessage());
                }, 10000)
                throw new Error(response.status.toString());
            } if (response.status===401 || response.status===500){
                dispatch(putMessage('Invalid password or login. Please try again.'))
                setTimeout(() => {
                    dispatch(closeMessage());
                }, 10000)
                throw new Error(response.status.toString());
            }
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
            dispatch(putUser(data));
            dispatch(putToken(token));
            // localStorage.setItem('token', token);
            // localStorage.setItem('user', JSON.stringify(data));
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(data));
        } else {
            dispatch(putMessage('Invalid password or login. Please try again or click on the "Forgot your password?" link to reset it.'))
            setTimeout(() => {
                dispatch(closeMessage());
            }, 10000)
            throw new Error(response.status.toString());
        }
    }
}

export const fetchUpdateUser = (firstName, lastName) => {
    return async (dispatch, getState) => {
        const response = await fetch(`${baseUrl}/account/user/${getState().user.user.email}`, {
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
            dispatch(putMessage('Contact information has been successfully changed'))
            setTimeout(() => {
                dispatch(closeMessage());
            }, 10000)
        } else {
            dispatch(putMessage("Data name has not been changed"));
            setTimeout(() => {
                dispatch(closeMessage());
            }, 10000)
            throw new Error(response.status.toString());
        }
    }
}
export const fetchChangePassword = (password) => {
    return async (dispatch, getState) => {
        const response = await fetch(`${baseUrl}/account/changePassword/user/${getState().user.user.login}`, {
            method: 'Put',
            headers: {
                'Authorization': getState().token,
                'X-Password': password
            }
        });
        if (response.ok) {
            dispatch(putToken(createToken(getState().user.user.login, password)));
            dispatch(putMessage("Password has been successfully changed"));
            setTimeout(() => {
                dispatch(closeMessage());
            }, 10000)
        } else {
            throw new Error(response.status.toString());
        }
    }
}

export const fetchDeleteUser = (token) => {
    return async (dispatch, getState) => {
        const response = await fetch(`${baseUrl}/account/delete/${getState().user.user.login}`, {
            method: 'Delete',
            headers: {
                'Authorization': token
            }
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(deleteUser(data));
            dispatch(deleteToken());
            dispatch(putMessage("User has been successfully deleted"));
            setTimeout(() => {
                dispatch(closeMessage());
            }, 5000)
            localStorage.setItem('token', '');
            localStorage.setItem('user', '');
        } else {
            throw new Error(response.status.toString());
        }
    }
}

export const fetchForgotPassword = (email) => {
    return async (dispatch) => {
        const response = await fetch(`${baseUrl}/account/resetPassword/?email=${email}`, {
                method: 'Post',
            }
        );
        if (response.ok) {
            dispatch(putMessage('We have sent a reset password link to your email. Please check'))
            setTimeout(() => {
                dispatch(closeMessage());
            }, 50000)
        }else {
            throw new Error(response.status.toString());
        }
    }
}

