import React from "react";
import { Link } from 'react-router-dom';

export default function Game(propsGames){
    //console.log('Game ',propsGames);
    return (
        <div>
            <div>
                <h3>{propsGames.name}</h3>
            </div>
            <div>
                <Link to={`/detail/${propsGames.id}`}>
                    <img src={propsGames.image} alt="Videogame" />
                </Link>
            </div>
            <div>
                <h4>{propsGames.genres}</h4>
            </div>
        </div>
    );
}
