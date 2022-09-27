import React from "react";
import { Link } from 'react-router-dom';
//import '../css/Game.css';

export default function Game(propsGames){
    //console.log('Game ',propsGames);
    return (
        <div className="card">
            <div className="face face1">
                <div className="content">
                    <Link to={`/detail/${propsGames.id}`}>
                        <img src={propsGames.image} alt="Videogame" />
                    </Link>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <div>
                        <h3>{propsGames.name}</h3>
                    </div>
                    <div>
                        <h4>{propsGames.genres}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
