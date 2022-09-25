import React from "react";
import mario from '../img/mario-kart-video-games.gif';
import '../css/Loading.css';

export default function Loading(){
    return(
        <div className="box">
            <span>
                <img className="circle" src={mario} alt="Loading" />
            </span>
            <span className="loader">Loading...</span>
        </div>
    )
};