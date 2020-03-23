import {
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAILURE,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE,
    LOAD_CONTACTS_REQUEST,
    LOAD_CONTACTS_SUCCESS,
    SELECT_ACTIVE_CONTACT
} from '../constants/constants';
import { IContactsState, IAction } from '../store/interfaces/root.interface';

let initialState: IContactsState = {
    isLoading: false,
    contacts: [],
    activeContact: null,
    error: false
};

function contactsReducer(state: IContactsState = initialState, action: IAction): IContactsState {
    switch (action.type) {
        case LOAD_CONTACTS_REQUEST:
        case CREATE_CONTACT_REQUEST:
        case DELETE_CONTACT_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case LOAD_CONTACTS_SUCCESS:
        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                contacts: [...action.payload],
                error: false
            };

        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                contacts: state.contacts.filter((contact) => {
                    return contact._id !== action.payload
                }),
                error: false
            };

        case CREATE_CONTACT_FAILURE:
        case DELETE_CONTACT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            };

        case SELECT_ACTIVE_CONTACT:
            return {
                ...state,
                activeContact: action.payload
            };

        default:
            return state;
    }
}

export default contactsReducer;