import axios from "axios";

export const ORDER_BY_NAME = 'ORDER_BY_NAME'; 



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