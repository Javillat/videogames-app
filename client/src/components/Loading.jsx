import React from "react";
import mario from '../img/mario-kart-video-games.gif';
//import '../src/css/Loading.css';

export default function Loading(){
    return(
        <div>
            <span>
                <img src={mario} alt="Loading" />
            </span>
            <span className="loader">Loading...</span>
        </div>
    )
};