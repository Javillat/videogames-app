import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Games from "./Games";
import Nav from "./Nav";
import { getVideogames } from './redux/actions/Actions';

export default function Home(){
    const dispatch = useDispatch();
    const videogames = useSelector(data => data.videogames);

    useEffect(()=>{
        dispatch(getVideogames())
    },[]);
    return(
        <div>
            <Nav />
            <Games videogames={videogames} />
        </div>
    )
};
