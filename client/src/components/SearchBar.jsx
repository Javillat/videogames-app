/**
 * Componente que recibe un input y recibe un texto para buscar 
 * dentro de los videogames, devolviendo un resultado.
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "./redux/actions/Actions";
import '../css/SearchBar.css'

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
        <div className="search_container">
            <form onSubmit={HandleSubmitVideogame}>
                <input className="search_input"
                    type="text"
                    placeholder="Videogame..."
                    value={videogameValue}
                    onChange={click => setVideogameValue(click.target.value)}
                    />
                <input type='submit' valua='Search videogame'/>
            </form>
        </div>
    );
};