import React from 'react';
import { IAvatar } from '../../utils/avatar.interface';
import avatarTitle from '../../utils/avatarTitle';
import './avatar.scss';


const ContactAvatar = (props: IAvatar) => {
    return (
        <div className={`avatar ${props.largeAvatar ? 'avatar-large' : ''}`}>
            {avatarTitle(props.title)}
        </div>
    )
};

export default ContactAvatar;