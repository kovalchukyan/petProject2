import {
    LOAD_CONTACTS_REQUEST,
    LOAD_CONTACTS_SUCCESS
} from '../constants/constants';
import { IContact } from '../store/interfaces/contacts.interface';
import { Dispatch } from 'react';

export function loadContactsRequest(): ILoadContactsRequest {
    return {
        type: LOAD_CONTACTS_REQUEST
    }
}

export function loadContactsSuccess(contacts: IContact[]): ILoadContactsSuccess {
    return {
        type: LOAD_CONTACTS_SUCCESS,
        payload: contacts
    }
}

export default function loadContactsFetch(contacts: IContact[]) {
    return (dispatch: Dispatch<any>) => {
        dispatch(loadContactsRequest());
        dispatch(loadContactsSuccess(contacts))
    }
}

interface ILoadContactsRequest {
    type: string
}

interface ILoadContactsSuccess {
    type: string,
    payload: IContact[]
}