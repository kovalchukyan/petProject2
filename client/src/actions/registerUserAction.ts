import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from '../constants/constants';
import { Dispatch } from 'react';
import { apiRequestUserRegister } from '../api/apiRequest';
import loadContactsFetch from './loadContactsAction';

function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST
    }
}

function registerUserSuccess(response: IRegisterUserResponse): IRegisterUserSuccess {
    return {
        type: REGISTER_USER_SUCCESS,
        username: response.user.username,
        id: response.user._id
    }
}

function registerUserFailure(error: any): IRegisterUserFailure {
    return {
        type: REGISTER_USER_FAILURE,
        payload: error
    }
}

export default function registerUserFetch(username: string, password: string) {
    return (dispatch: Dispatch<any>) => {
        dispatch(registerUserRequest());
        apiRequestUserRegister(username, password)
            .then(response => {
                if(response.success) {
                    dispatch(registerUserSuccess(response));
                    dispatch(loadContactsFetch(response.user.contacts));
                } else {
                    dispatch(registerUserFailure(response.error))
                }
            })
            .catch(error => {
                dispatch(registerUserFailure(error));
            })
    }
}

interface IRegisterUserResponse{
    type: string,
    user: {
        username: string,
        _id: string
    }
}

interface IRegisterUserSuccess {
    type: string,
    username: string,
    id: string
}

interface IRegisterUserFailure {
    type: string,
    payload: any
}