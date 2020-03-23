import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStateType } from '../../store/interfaces/root.interface';
import { Link } from 'react-router-dom';
import logoutUserAction from '../../actions/logoutUserAction';
import './header.scss';

const Header = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const isAuth = useSelector((state: IStateType) => state.userReducer.isAuth);
    const handleLogout = () => {
        dispatch(logoutUserAction());
    };

    return (
        <header className="header">
            { !isAuth && <Link to="/login" className="waves-effect waves-light btn-small header-btn">Login</Link> }
            { isAuth && <Link to="/login" className="waves-effect waves-light btn-small header-btn" onClick={handleLogout}>Logout</Link>}
        </header>
    )
};

export default Header;