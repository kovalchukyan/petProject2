import {CONTACTS_FAILURE, CONTACTS_REQUEST} from '../constants/constants';
import loadContactsFetch from "./loadContactsAction";
import { apiRequestContacts } from '../api/apiRequest';

export function getContactsRequest() {
    return {
        type: CONTACTS_REQUEST
    }
}

export function getContactsFailure(error) {
    return {
        type: CONTACTS_FAILURE,
        payload: error
    }
}

export default function getContactsFetch(username) {
    return dispatch => {
        dispatch(getContactsRequest());
        apiRequestContacts(username)
            .then(response => {
                if(response.success) {
                    dispatch(loadContactsFetch(response.user.contacts));
                } else {
                    dispatch(getContactsFailure(response.error))
                }

            })
            .catch(error => {
                dispatch(getContactsFailure(error));
            })
    }
}