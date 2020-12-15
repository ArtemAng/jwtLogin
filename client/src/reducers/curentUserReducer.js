const initState = {
    userId: null,
    token: null,
    login: ()=>{},
    logout: () => { console.log('Это я пиор, я все порчу'); },
    isAuthentificated: false
}

const curentUserReducer = (state = initState, action) => {
    switch (action.type) {
        // case 'SET_AUTENTIFICATED': {
        //     console.log(action.payload, 'set auf');
        //     return {
        //         ...state,                                      // Нахуй не нужон  SET_AUTENTIFICATED ваш!!!
        //         ...action.payload,
        //     };
        // }
        case 'LOGIN': {
            const { token, id } = action.payload;
            console.log(state, 'logiiiiiin reducer')
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