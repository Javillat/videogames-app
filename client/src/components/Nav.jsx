import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

/**
 * Componente general que se muestra en la ruta del home o principal.
 * Contiene la barra de busqueda, botones de filtrado, creación de recetas, imagen home.
 */

function Nav(){
    return(
        <nav>
            <SearchBar />
            <Link to = '/create'><button>Create videogame</button></Link>
            {/* Acá irán los componentes de filtrado, de ordenamiento */}
        </nav>
    );
}

export default Nav;