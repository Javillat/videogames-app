import axios from "axios";

export function getVideogames(){
    return async (dispatch) => {
        const getData = await axios.get('http://localhost:3001/videogames')
        dispatch({
            type: 'GET_VIDEOGAMES',
            payload: getData.data
        })
    }
}