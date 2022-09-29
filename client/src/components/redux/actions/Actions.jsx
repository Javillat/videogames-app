import axios from "axios";

export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING'; 
export const SELECT_BY_GENRE = 'SELECT_BY_GENRE';
export const SELECT_BY_BD_API = 'SELECT_BY_BD_API';



export function getVideogames(){
    return async (dispatch) => {
        const getData = await axios.get('http://localhost:3001/videogames')
        dispatch({
            type: 'GET_VIDEOGAMES',
            payload: getData.data
        })
    }
}

export function getVideogamesByName(gameName){
    return async (dispatch) => {
        const getData = await axios.get(`http://localhost:3001/videogames?name=${gameName}`)
        dispatch({
            type: 'GET_VIDEOGAME_BY_NAME',
            payload: getData.data
        })
    }
}

export function getVideogameDetail(id){
    return async(dispatch) => {
        const getData = await axios.get(`http://localhost:3001/videogames/${id}`)
        dispatch({
            type: 'GET_VIDEOGAME_DETAIL',
            payload: getData.data
        })
    }
}

//Filtros

export function orderByNameAction(value){
    return{
        type: 'ORDER_BY_NAME',
        payload: value
    }
}

export function orderByRatingAction(value){
    return{
        type:'ORDER_BY_RATING',
        payload: value
    }
}

export function filterByGenreAction(value){
    return{
        type:'SELECT_BY_GENRE',
        payload: value
    }
}

export function filterByBdApiAction(value){
    return{
        type:'SELECT_BY_BD_API',
        payload: value
    }
}

// export function getGenres(){
//     return async (dispatch) =>{
//         const genres = (await axios.get('http://localhost:3001/genres')).data;
//         dispatch({
//             type: 'GET_GENRES',
//             payload: genres
//         })

//     } 
// }