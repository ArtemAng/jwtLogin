import { combineReducers } from 'redux';
import curentUser from './curentUserReducer';
import usersList from './usersListReducer';

export default combineReducers({
    curentUser,
    usersList
})