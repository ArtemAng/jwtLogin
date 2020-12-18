const initState = {
    userId: null,
    token: null,
    login: ()=>{},
    logout: () => { },
    isAuthentificated: false,
}

const curentUserReducer = (state = initState, action) => {
    switch (action.type) {
   
        case 'LOGIN': {
            const { token, id } = action.payload;
            localStorage.setItem('userData', JSON.stringify({token: token, userId: id}));
            return { ...state, token: token, userId: id, isAuthentificated: !!token }
        }
        case 'LOGOUT': {
            localStorage.setItem('userData', JSON.stringify({ userId: null, token: null }))
            return { ...state, userId: null, token: null, }
        }
        default: return state;
    }
}

export default curentUserReducer;