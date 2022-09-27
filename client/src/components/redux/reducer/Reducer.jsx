//import { combineReducers } from "redux";
import { ORDER_BY_NAME } from "../actions/Actions";

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
        case ORDER_BY_NAME:
            const order = action.payload === 'ASCENDENT' 
            ? state.videogames.sort((videogameA,videogameB) => {
               if(videogameA.name > videogameB.name) return 1;
               if(videogameA.name < videogameB.name) return -1;
               else return 0;
            })
            : state.videogames.sort((videogameA, videogameB) => {
                if(videogameA.name > videogameB.name) return -1;
                if(videogameA.name < videogameB.name) return 1;
                else return 0;
            })
        return{
            ...state,
            videogames: order
        }
            
    
        default: return state;
    }
}

export default Reducer;