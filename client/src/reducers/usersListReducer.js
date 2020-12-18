const initalState = [];

const usersListReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_USERS_LIST':
            console.log(...action.payload);
            return [...action.payload];
        default:
            return state;
    }
}
export default usersListReducer;
