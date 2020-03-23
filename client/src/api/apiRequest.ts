import fetch from 'isomorphic-fetch';
import { IContact } from '../store/interfaces/contacts.interface';

export const apiRequestUserRegister = (username: string, password:string)  => {
    return fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if(data) {
                return data;
            }
        })
        .catch(error => {
            return console.log(error);
        })
};

export const apiRequestUserLogin = (username: string, password: string) => {
    return fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if(data) {
                return data;
            }
        })
        .catch(error => {
            return console.log(error);
        })
};

export const apiRequestCreateContact = (username: string, data: IContact) => {
    return fetch('http://localhost:8080/api/contacts/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, data })
    })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                return data;
            }
        })
        .catch(error => {
            return console.log(error)
        })
};

export const apiRequestDeleteContact = (username: string, id: any) => {
    return fetch('http://localhost:8080/api/contacts/delete', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, id })
    })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                return data;
            }
        })
        .catch(error => {
            return console.log(error);
        })
};