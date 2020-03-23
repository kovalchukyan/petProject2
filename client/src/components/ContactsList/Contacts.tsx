import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IStateType } from '../../store/interfaces/root.interface';
import { IContact } from '../../store/interfaces/contacts.interface';
import ContactsComponent from './ContactsComponent';
import ContactCard from './ContactCard';
import './contactsList.scss';

const Contacts = () => {
    const [findContact, setContact] = useState('');
    const contacts: IContact[] = useSelector((state: IStateType) => state.contactsReducer.contacts);
    const error: boolean = useSelector((state: IStateType) => state.contactsReducer.error);
    const isAuth: boolean = useSelector((state: IStateType) => state.userReducer.isAuth);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setContact(event.target.value);
    };

    const filterContacts = (contacts: IContact[]): IContact[] => {
        return contacts.filter(contact => {
            return contact.name.toLowerCase().includes(findContact.toLowerCase());
        })
    };

    if(!isAuth) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <section className="contacts-list">
            <div className="contacts-list-container">
                <div className="contacts-list-wrapper">
                    <div className="input-field search-field">
                        <input id="username" type="text" className="validate" value={findContact} placeholder="Find a contact..." onChange={handleChange} />
                    </div>
                    <div className="contacts-list-row">
                        <div className="col-md-6">
                            <ContactsComponent
                                contacts={filterContacts(contacts)}
                                error={error} />
                        </div>
                        <div className="col-md-6">
                            <ContactCard />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Contacts;