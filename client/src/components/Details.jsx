import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideogameDetail } from './redux/actions/Actions';
import { useHistory } from "react-router-dom";
//import Loading from './Loading';

export default function Details(){
    let { id } = useParams();
    let history = useHistory();
    console.log('id ',id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogameDetail(id))
    },[]);

    const backHandler = (evt) =>{
        //evt.preventDefaultd()
        history.push('/home');
    }

    const detail = useSelector(data => data.details);
    console.log('selector ', detail);
    return(
        (detail !== undefined) ?
        (<div>
            <span><button onClick={backHandler}>Go Back</button></span>
            <div><h2>Videogame</h2></div>
            <div><h3>Id</h3>{detail.id}</div>
            <div><h3>Name</h3>{detail.name}</div>
            <div><img src={detail.image} alt="Videogame img" /></div>
            <div><h3>Genres</h3>{detail.genres}</div>
            <div><h3>Description</h3>{detail.description}</div>
            <div><h3>Released</h3>{detail.released}</div>
            <div><h3>Rating</h3>{detail.rating}</div>
            <div><h3>Platforms</h3>{detail.platforms}</div>
        </div>

        ) : ('Loading')
    );
};