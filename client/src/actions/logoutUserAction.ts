import {
    LOGOUT_USER_SUCCESS
} from '../constants/constants';

export default function logoutUserSuccess(): ILogoutUserSuccess {
    return {
        type: LOGOUT_USER_SUCCESS
    }
}

interface ILogoutUserSuccess {
    type: string
}