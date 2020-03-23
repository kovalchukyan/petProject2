import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStateType } from '../../store/interfaces/root.interface';
import './sidebar.scss';

const Sidebar: React.FC = () => {
    const isAuth: boolean = useSelector((state: IStateType) => state.userReducer.isAuth);
    if(!isAuth) {
        return (
            <aside>
                <ul className="sidebar">
                    <Link to="/" className="sidebar-logo">Admin panel</Link>
                    <hr className="sidebar-divider" />
                </ul>
            </aside>
        )
    }

    return (
        <aside>
            <ul className="sidebar">
                <Link to="/" className="sidebar-logo">Admin panel</Link>
                <hr className="sidebar-divider" />
                <div className="sidebar-title">Contacts</div>
                <li className="sidebar-item">
                    <Link to="/create" className="sidebar-item-link">
                        <i className="tiny material-icons">add</i>
                        <span className="sidebar-item-name">Create contact</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/list" className="sidebar-item-link">
                        <i className="tiny material-icons">format_list_bulleted</i>
                        <span className="sidebar-item-name">Contacts list</span>
                    </Link>
                </li>
                <hr className="sidebar-divider mt" />
            </ul>
        </aside>
    )
};

export default Sidebar;