import { IContact } from './contacts.interface';

export interface IStateType {
    contactsReducer: IContactsState,
    userReducer: IUserState
}

export interface IContactsState {
    isLoading: boolean,
    contacts: IContact[] | [],
    activeContact: IContact | null,
    error: boolean
}

export interface IUserState {
    username: string | null,
    id: string | null,
    isLoading: boolean,
    isAuth: boolean,
    error: any
}

export interface IAction {
    type: string,
    [prop: string]: any
}

export interface IHandleChange {
    target: {
        id: string,
        value: any
    },
    preventDefault: any
}