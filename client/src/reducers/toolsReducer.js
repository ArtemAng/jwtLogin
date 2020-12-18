const initalState = [];


const toolsReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_USERS_MAILS':
            console.log(action.payload)
            return [...action.payload];
        case 'DELETE_USER':
            return [...action.payload];
        case 'BLOCK_USER':
            return [...action.payload];

        default:
            return state;
    }
}
export default toolsReducer;