import React, { Dispatch, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { IContactsList } from '../../store/interfaces/contacts.interface';
import ContactAvatar from '../Avatar/avatar';
import { selectActiveContact } from '../../actions/selectActiveContactAction';
import './contactsList.scss';

const ContactsList = (props:IContactsList) => {
    const contact = props.contact;
    const dispatch: Dispatch<any> = useDispatch();

    const selectContact = (event: MouseEvent) => {
        event.preventDefault();
        dispatch(selectActiveContact(contact))
    };

    return contact && (
        <div className="contact" id={contact._id} onClick={selectContact}>
            <div className="contact-data">
                <div className="primary">{contact.name}</div>
                <div className="secondary">{contact.email}</div>
            </div>
            <div className="contact-avatar">
                <ContactAvatar title={contact.name} />
            </div>
        </div>
    )
};

export default ContactsList;