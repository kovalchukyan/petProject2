import { SELECT_ACTIVE_CONTACT } from '../constants/constants';
import { IContact } from '../store/interfaces/contacts.interface';

export function selectActiveContact(contact: IContact | null): ISelectActiveContact {
    return {
        type: SELECT_ACTIVE_CONTACT,
        payload: contact
    }
}

interface ISelectActiveContact {
    type: string,
    payload: IContact | null
}