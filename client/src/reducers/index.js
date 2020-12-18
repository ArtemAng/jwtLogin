import { combineReducers } from 'redux';
import curentUser from './curentUserReducer';
import usersList from './usersListReducer';
import tools from './toolsReducer';

export default combineReducers({
    curentUser,
    usersList,
    tools
})