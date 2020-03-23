import React, { useState, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IStateType, IHandleChange } from '../../store/interfaces/root.interface';
import loginUserAction from '../../actions/loginUserAction';
import registerUserAction from '../../actions/registerUserAction';
import './login.scss';

const Login: React.FC = () => {
    const [state, setState] = useState({
        username: '',
        password: '',
        error: null
    });
    const dispatch: Dispatch<any> = useDispatch();
    const isAuth: boolean = useSelector((state: IStateType) => state.userReducer.isAuth);
    const error: any = useSelector((state: IStateType) => state.userReducer.error);
    const loading: boolean = useSelector((state: IStateType) => state.userReducer.isLoading);

    if(isAuth) {
        return (
            <Redirect to="/"/>
        )
    }

    const handleChange = (event: IHandleChange) => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        })
    };

    const handleLogin = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(loginUserAction(state.username, state.password))
    };

    const handleRegister = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(registerUserAction(state.username, state.password))
    };

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="input-field col s12">
                    <input id="username" type="text" className="validate" value={state.username} onChange={handleChange}/>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12">
                    <input id="password" type="password" className="validate" value={state.password} onChange={handleChange}/>
                    <label htmlFor="password">Password</label>
                </div>
                <button className="waves-effect waves-light btn-small login-wrapper-btn-login" onClick={handleLogin}>
                    Login
                </button>
                <button className="waves-effect waves-light btn-small login-wrapper-btn-register" onClick={handleRegister}>
                    register
                </button>
                {loading && <span className="message">Loading ...</span>}
                {error && <span className="message">{error}</span>}
            </div>
        </div>
    )
};

export default Login;