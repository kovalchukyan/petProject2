import React, { Dispatch, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStateType } from '../../store/interfaces/root.interface';
import { IContact } from '../../store/interfaces/contacts.interface';
import deleteContactAction from '../../actions/deleteContactAction';
import { selectActiveContact } from '../../actions/selectActiveContactAction';
import ContactAvatar from '../Avatar/avatar';
import './contactsList.scss';

const ContactCard: React.FC = () => {
    const contact: IContact | null = useSelector((state: IStateType) => state.contactsReducer.activeContact);
    const username: string | null = useSelector((state: IStateType) => state.userReducer.username);
    const dispatch: Dispatch<any> = useDispatch();

    const handleDeleteClick = (event: MouseEvent) => {
        event.preventDefault();
        contact && username && dispatch(deleteContactAction(username, contact._id));
        dispatch(selectActiveContact(null));
    };

    if(!contact) {
        return null;
    }

    return(
        <div className="contact-card">
            <div className="row">
                <div className="col s12">
                    <div className="card contact-card-color">
                        <div className="card-content white-text">
                            <span className="card-title">Contact information</span>
                            <div className="contact-card-primary-info">{contact.name}</div>
                        </div>
                        <div className="contact-card-avatar">
                            <ContactAvatar title={contact.name} largeAvatar/>
                        </div>
                        <div className="contact-card-table">
                            <span>Email: {contact.email}</span>
                            <span>Phone: {contact.phone}</span>
                            <span>Location: {contact.city}</span>
                        </div>
                        <div className="card-action" onClick={handleDeleteClick}>
                            <button className="waves-effect waves-light btn-small contact-card-btn">Delete contact</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContactCard;