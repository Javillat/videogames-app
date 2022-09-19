
const initialState = {
    videogames: [],
};

function Reducer(state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                state,
                videogames: action.payload
            };
    
        default:
            return state;
    }
}

export default Reducer;