import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Games from "./Games";
import Loading from "./Loading";
import Nav from "./Nav";
import { getVideogames } from './redux/actions/Actions';
//import '../css/Home.css'

export default function Home(){
    const [isFilter, setFilter] = useState([]);
    //const [isVideogames, setVideogames] = useState(false);
    const dispatch = useDispatch();
    const videogames = useSelector((data) => data.videogames);

    useEffect(()=>{
        dispatch(getVideogames())
    },[]);
    console.log(videogames);
    if(videogames == undefined || !videogames.length ) return <Loading />;
    return(
        <div>
            <Nav />
            <Games videogames={videogames} />
        </div>
    )
};
