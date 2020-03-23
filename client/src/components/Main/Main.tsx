import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStateType } from '../../store/interfaces/root.interface';
import logoutUserAction from '../../actions/logoutUserAction';
import './main.scss';

const Main = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const isAuth: boolean = useSelector((state: IStateType) => state.userReducer.isAuth);
    const handleLogout = (): void => {
        dispatch(logoutUserAction());
    };

    return (
        <main className="main-content">
            <div className="main-content-wrapper">
                <h1 className="main-content-title">Welcome to dashboard!</h1>
                { !isAuth && <Link to="/login" className="waves-effect waves-light btn-small main-content-btn">Sign in</Link> }
                { isAuth && <Link to="/login" className="waves-effect waves-light btn-small main-content-btn" onClick={handleLogout}>Logout</Link> }
            </div>
        </main>
    )
};

export default Main;