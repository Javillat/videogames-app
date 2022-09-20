/**
 * Componente que recibe un input y recibe un texto para buscar 
 * dentro de los videogames, devolviendo un resultado.
 */

import React, { useState } from "react";
import { useDispatch, useSelecto } from "react-redux";
import { getVideogamesByName } from "./redux/actions/Actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [ videogameValue, setVideogameValue ] = useState('');

    function HandleSubmitVideogame(event){
        event.preventDefault();
        dispatch(getVideogamesByName(videogameValue));
        setVideogameName('');
    }
    return(
        <form onSubmit={HandleSubmitVideogame}>
            <input
                type="text"
                placeholder="Find videogame..."
                value={videogameValue}
                onChange={click => setVideogameValue(click.target.validationMessage.i)}
            />
            <input type='submit' valua='Search videogame' />
        </form>
    )
}