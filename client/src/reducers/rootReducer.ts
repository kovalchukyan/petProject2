import { combineReducers } from 'redux';
//import { IStateType } from '../store/interfaces/root.interface';
import contactsReducer from './contactsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    contactsReducer,
    userReducer
});

export default rootReducer;