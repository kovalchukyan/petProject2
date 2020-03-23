import React, { useState, Dispatch, ChangeEvent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { IStateType } from '../../store/interfaces/root.interface';
import createContactAction from '../../actions/createContactAction';
import './contactCreate.scss';
import {IContact} from "../../store/interfaces/contacts.interface";

const CreateContact = () => {
    const [form, setForm] = useState({
        contactFirstName: {
            value: "",
            hasError: false,
            isValid: false
        },
        contactLastName: {
            value: "",
            hasError: false,
            isValid: false
        },
        email: {
            value: "",
            hasError: false,
            isValid: false
        },
        city: {
            value: '',
            hasError: false,
            isValid: false
        },
        phone: {
            value: '',
            hasError: false,
            isValid: false
        }
    });
    const dispatch: Dispatch<any> = useDispatch();
    const username: string | null = useSelector((state: IStateType) =>  state.userReducer.username );
    const isAuth: boolean = useSelector((state: IStateType) => state.userReducer.isAuth);
    const history = useHistory();
    const disable: boolean = !form.contactFirstName.isValid || !form.email.isValid || !form.contactLastName.isValid || !form.phone.isValid || !form.city.isValid;

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        let error = false;
        let name = event.target.value;
        let nameRegex = /^[a-zA-Z ]+$/.test(name);

        if (!nameRegex) {
            error = true;
        }

        setForm({
            ...form,
            [event.target.id]: {
                value: event.target.value,
                hasError: error,
                isValid: nameRegex
            }
        });
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        let error = false;
        let email = event.target.value;
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );

        if (!emailRegex) {
            error = true;
        }

        setForm({
            ...form,
            email: {
                value: event.target.value,
                hasError: error,
                isValid: emailRegex
            }
        });
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        let error = false;
        let phone = event.target.value;
        let phoneRegex = /^[0-9]{1,12}$/.test(phone);

        if(!phoneRegex) {
            error = true;
        }

        setForm({
            ...form,
            phone: {
                value: event.target.value,
                hasError: error,
                isValid: phoneRegex
            }
        })
    };

    const handleCreateClick = (event: MouseEvent) => {
        event.preventDefault();

        const { contactFirstName, contactLastName, email, phone, city } = form;
        const data: IContact = {
            'name': `${contactFirstName.value} ${contactLastName.value}`,
            'email': email.value,
            'phone': phone.value,
            'city': city.value
        };

        username && dispatch(createContactAction(username, data));
        history.push('/list');
        setForm({
            contactFirstName: {
                value: "",
                hasError: false,
                isValid: false
            },
            contactLastName: {
                value: "",
                hasError: false,
                isValid: false
            },
            email: {
                value: "",
                hasError: false,
                isValid: false
            },
            city: {
                value: '',
                hasError: false,
                isValid: false
            },
            phone: {
                value: '',
                hasError: false,
                isValid: false
            }
        });
    };

    if(!isAuth) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <div className="create-contact">
            <div className="create-contact-wrapper">
                <div className="input-field col s12">
                    <input id="contactFirstName" type="text" className="validate" value={form.contactFirstName.value} onChange={handleNameChange} />
                    <label htmlFor="contactFirstName">Contact First Name</label>
                </div>
                <div className="input-field col s12">
                    <input id="contactLastName" type="text" className="validate" value={form.contactLastName.value} onChange={handleNameChange} />
                    <label htmlFor="contactLastName">Contact Last Name</label>
                </div>
                <div className="input-field col s12">
                    <input id="email" type="email" className="validate" value={form.email.value} onChange={handleEmailChange} />
                    <label htmlFor="email">Contact email</label>
                </div>
                <div className="input-field col s12">
                    <input id="phone" type="number" className="validate" value={form.phone.value} onChange={handlePhoneChange} />
                    <label htmlFor="phone">Contact phone</label>
                </div>
                <div className="input-field col s12">
                    <input id="city" type="text" className="validate" value={form.city.value} onChange={handleNameChange} />
                    <label htmlFor="city">Contact city</label>
                </div>
                <div className="create-contact-btn-wrapper">
                    <button className="waves-effect waves-light btn-small create-contact-btn" onClick={handleCreateClick} disabled={disable}>
                        Create Contact
                    </button>
                </div>
            </div>
        </div>
    )
};

export default CreateContact;