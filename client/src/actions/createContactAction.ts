import {
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAILURE
} from '../constants/constants';
import { Dispatch } from 'react';
import { IContact } from '../store/interfaces/contacts.interface';
import { apiRequestCreateContact } from '../api/apiRequest';

function createContactRequest(): ICreateContactRequest {
    return {
        type: CREATE_CONTACT_REQUEST
    }
}

function createContactSuccess(data: ICreateContactData): ICreateContactSuccess {
    return {
        type: CREATE_CONTACT_SUCCESS,
        payload: data.contacts
    }
}

function createContactFailure(error: any): ICreateContactFailure {
    return {
        type: CREATE_CONTACT_FAILURE,
        payload: error
    }
}

export default function createContactFetch(username: string, data: IContact) {
    return (dispatch: Dispatch<any>) => {
        dispatch(createContactRequest());
        apiRequestCreateContact(username, data)
            .then(response => {
                dispatch(createContactSuccess(response))
            })
            .catch(error => {
                dispatch(createContactFailure(error))
            })
    }
}

interface ICreateContactRequest {
    type: string
}

interface ICreateContactSuccess {
    type: string,
    payload: IContact[]
}

interface ICreateContactFailure {
    type: string,
    payload: any
}

interface ICreateContactData {
    contacts: IContact[],
    success: boolean
}