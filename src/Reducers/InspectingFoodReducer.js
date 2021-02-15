const inspectingFoodReducer = (state = "", action) => {
    switch(action.type){
        case 'SET_INPSECT_FOOD':
            return action.payload;
        default:
            return state;
    }
}

export default inspectingFoodReducer;