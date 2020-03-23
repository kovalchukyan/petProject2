import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_SUCCESS
} from '../constants/constants';
import { IUserState, IAction } from '../store/interfaces/root.interface';

let initialState: IUserState = {
    username: null,
    id: null,
    isLoading: false,
    isAuth: false,
    error: null
};

function userReducer(state: IUserState = initialState, action: IAction) {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                username: action.username,
                id: action.id,
                isLoading: false,
                isAuth: true,
                error: false
            };

        case REGISTER_USER_FAILURE:
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                username: null,
                id: null,
                isLoading: false,
                isAuth: false,
                error: action.payload
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isAuth: false
            };

        default:
            return state;
    }
}

export default userReducer;