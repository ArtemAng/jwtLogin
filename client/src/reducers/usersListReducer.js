const initalState = [];

const usersListReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'test':
            return state;    
        default:
            return state;
    }
}
export default usersListReducer;
