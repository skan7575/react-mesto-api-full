import {baseLink} from "./virables";
import getResponseData from "./utils";

export const register = (email, password) => {
    return fetch(`${baseLink}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then(getResponseData)
}

export const authorize = (email, password) => {
    return fetch(`${baseLink}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(getResponseData);
};

export const checkToken = (token) => {
    return fetch(`${baseLink}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
        .then(getResponseData)
        .then((data) => data);
};