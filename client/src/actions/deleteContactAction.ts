import {
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE
} from '../constants/constants';
import { Dispatch } from 'react';
import { IContact } from '../store/interfaces/contacts.interface';
import { apiRequestDeleteContact } from '../api/apiRequest';

function deleteContactRequest(): IDeleteContactRequest {
    return {
        type: DELETE_CONTACT_REQUEST,
    }
}

function deleteContactSuccess(data: IContactData): IDeleteContactSuccess {
    return {
        type: DELETE_CONTACT_SUCCESS,
        payload: data.contact
    }
}

function deleteContactFailure(error: any): IDeleteContactFailure {
    return {
        type: DELETE_CONTACT_FAILURE,
        payload: error
    }
}

export default function deleteContactFetch(username: string, id: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch(deleteContactRequest());
        apiRequestDeleteContact(username, id)
            .then(response => {
                dispatch(deleteContactSuccess(response));
            })
            .catch(error => {
                dispatch(deleteContactFailure(error));
            })
    }
}

interface IDeleteContactRequest {
    type: string
}

interface IDeleteContactSuccess {
    type: string,
    payload: IContact
}

interface IDeleteContactFailure {
    type: string,
    payload: any
}

interface IContactData {
        contact: IContact
}