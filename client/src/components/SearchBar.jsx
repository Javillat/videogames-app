/**
 * Componente que recibe un input y recibe un texto para buscar 
 * dentro de los videogames, devolviendo un resultado.
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "./redux/actions/Actions";

export default function SearchBar() {
    //console.log(props);
    const dispatch = useDispatch();
    const [ videogameValue, setVideogameValue ] = useState('');
    //const [ isSearching, setSearching ] = useState(false);

    function HandleSubmitVideogame(event){
        event.preventDefault();
        dispatch(getVideogamesByName(videogameValue));
        setVideogameValue('');
        //setSearching(true);  
    }
    
    //if(isSearching === true) props.getSearchState(isSearching);
    
    // console.log('Nav ',props.getSearchState); 
    // console.log(isSearching);
    return(
        <form onSubmit={HandleSubmitVideogame}>
            <input
                type="text"
                placeholder="Find videogame..."
                value={videogameValue}
                onChange={click => setVideogameValue(click.target.value)}
            />
            <input type='submit' valua='Search videogame'/>
        </form>
    );
};