
const initialState = {
    videogames: [],
    details: [],
};

function Reducer(state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                state,
                videogames: action.payload
            };
        case 'GET_VIDEOGAME_BY_NAME':
            return{
                state, 
                videogames: action.payload
            };
        case 'GET_VIDEOGAME_DETAIL':
            return{
                state,
                details: action.payload
            }
    
        default:
            return state;
    }
}

export default Reducer;