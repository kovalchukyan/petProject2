import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE
} from '../constants/constants';
import { Dispatch } from 'react';
import { IContact } from '../store/interfaces/contacts.interface';
import { apiRequestUserLogin } from '../api/apiRequest';
import loadContactsFetch from './loadContactsAction';

function loginUserRequest(): ILoginUserRequest {
    return {
        type: LOGIN_USER_REQUEST
    }
}

function loginUserSuccess(response: IResponse): ILoginUserSuccess {
    return {
        type: LOGIN_USER_SUCCESS,
        username: response.user.username,
        id: response.user._id
    }
}

function loginUserFailure(error: string): ILoginUserFailure {
    return {
        type: LOGIN_USER_FAILURE,
        payload: error
    }
}

export default function loginUserFetch(username: string, password: string) {
    return (dispatch: Dispatch<any>)  => {
        dispatch(loginUserRequest());
        apiRequestUserLogin(username, password)
            .then((response: IResponse) => {
                if(response.success) {
                    dispatch(loginUserSuccess(response));
                    dispatch(loadContactsFetch(response.user.contacts));
                } else {
                    dispatch(loginUserFailure(response.error))
                }

            })
            .catch((error: string) => {
                dispatch(loginUserFailure(error));
            })
    }
}

interface IResponse {
    user: {
        username: string,
        _id: string,
        contacts: IContact[]
    },
    success: boolean,
    error: any
}

interface ILoginUserRequest {
    type: string
}

interface ILoginUserSuccess {
    type: string,
    username: string,
    id: string
}

interface ILoginUserFailure {
    type: string,
    payload: string
}