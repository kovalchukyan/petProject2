import React from 'react';
import ContactsList from './ContactsList';
import { IContact } from '../../store/interfaces/contacts.interface';
import './contactsList.scss';

const ContactsComponent = (props: any) => {
    if (props.error) {
        return (
            <div className="message">Something goes wrong! Reload the page.</div>
        )
    }

    if (props.contacts.length === 0) {
        return (
            <div className="message">Contacts not found</div>
        )
    }

    return (
        props.contacts.map((contact: IContact) => {
            return (
                <ContactsList
                    key={contact._id}
                    contact={contact} />
            )
        })
    );
};

export default ContactsComponent;