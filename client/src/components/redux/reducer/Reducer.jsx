//import { combineReducers } from "redux";
import { GET_GENRES, ORDER_BY_NAME, ORDER_BY_RATING, SELECT_BY_BD_API, SELECT_BY_GENRE } from "../actions/Actions";

const initialState = {
    videogames: [],
    videogamesbase: [],
    details: [],
    //genres: [],
};

function Reducer(state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogamesbase: action.payload,
                videogames: action.payload,
            };
        case 'GET_VIDEOGAME_BY_NAME':
            return{
                ...state, 
                videogames: action.payload
            };
        case 'GET_VIDEOGAME_DETAIL':
            return{
                ...state,
                details: action.payload
            }
        case ORDER_BY_NAME:
            const order = action.payload === 'ASCENDENT' 
            ? state.videogamesbase.sort((videogameA,videogameB) => {
               if(videogameA.name > videogameB.name) return 1;
               if(videogameA.name < videogameB.name) return -1;
               else return 0;
            })
            : state.videogamesbase.sort((videogameA, videogameB) => {
                if(videogameA.name > videogameB.name) return -1;
                if(videogameA.name < videogameB.name) return 1;
                else return 0;
            })
            return{
                ...state,
                videogames: order
            }
        case ORDER_BY_RATING:
            const order_rating = action.payload ==='ASCENDENT'
            ?state.videogames.sort((videogameA, videogameB) => {
                if(videogameA.rating > videogameB.rating) return 1;
                if(videogameA.rating < videogameB.rating) return -1;
                else return 0;
            })
            : state.videogames.sort((videogameA, videogameB) => {
                if(videogameA.rating > videogameB.rating) return -1;
                if(videogameA.rating < videogameB.rating) return 1;
            })
            return{
                ...state,
                videogames: order_rating
            }
        case SELECT_BY_GENRE:
            const genre_payload = action.payload;
            //const state_local = state.videogames;
            const filtered = state.videogamesbase.filter(videogame => videogame.genres.includes(genre_payload));
            return{
                ...state,
                videogames:filtered
            };//Solucionar el estado se va quedando vacio al hacer algun filtrado !!!SOLUCIONADO¡¡¡

        case SELECT_BY_BD_API:
            const bdapi_payload = action.payload;
            if(bdapi_payload.includes('BD')){
                const filteredbd = state.videogames.filter(videogame => videogame.id.toString().includes(bdapi_payload));
                return{
                    ...state,
                    videogames: filteredbd
                }
            }else{
                let bd = 'BD';
                const filteredAPI = state.videogames.filter(videogame => !videogame.id.toString().includes(bd));
                return{
                    ...state,
                    videogames: filteredAPI
    
                }
            }
    
        default: return state;
    }
}

export default Reducer;