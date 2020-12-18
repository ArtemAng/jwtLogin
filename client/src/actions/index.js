export const setAutentificated = (payload) => ({ type: 'SET_AUTENTIFICATED', payload });
export const makeLogin = (payload) => ({ type: 'LOGIN', payload });
export const makeLogout = (payload) => ({ type: 'LOGOUT', payload });
export const setUsersList = (payload) => ({ type: 'SET_USERS_LIST', payload });
export const setUsersMails = (payload) => ({ type: 'SET_USERS_MAILS', payload });
export const deleteUser = (payload) => ({ type: 'DELETE_USER', payload });
export const blockUser = (payload) => ({ type: 'BLOCK_USER', payload });