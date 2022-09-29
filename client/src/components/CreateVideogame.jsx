import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateVideogame(){
    const dispatch = useDispatch();
    const history = useHistory();
    //const genres = useSelector(data => data.genres);

    const [send, setSend] = useState({
        genreid:[],
        name:'',
        description:'',
        image:'',
        released:'',
        rating:'',
        platforms:[]
    });
    const [genros, setGenros] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/genres').then((response) =>{
             setGenros(response.data);
            });
    },[]);

    const submitVideogames = (event) => {
        event.preventDefault();
        
        if(!send.genreid){
            alert('Genres are required');
            return;
        }
        if(!send.name){
            alert('Name is required');
            return;
        }
        if(!send.description){
            alert('Description is required');
            return;
        }
        if(!send.released){
            alert('Release is required');
            return;
        }
        if(!send.rating){
            alert('Rating is required');
            return;
        }
        if(!send.platforms){
            alert('Platforms are required');
            return;
        }
        axios.post('http://localhost:3001/videogames', send);
        alert('Videogames succefull created');
        setSend({
            genreid:[],
            name:'',
            description:'',
            image:'',
            released:'',
            rating:'',
            platforms:[]
        });
        history.push('/home');

    }
    return(
        <div>
            <form onSubmit={(evt) => submitVideogames(evt)}>
                <input 
                    type='text'
                    placeholder='Name...'
                    name='name'
                    value={input.name}
                    onChange={clickEvent => handleChanges(clickEvent)}
                />

                <input 
                    type='text'
                    placeholder='Description...'
                    name='description'
                    value={input.description}
                    onChange={clickEvent => handleChanges(clickEvent)}
                />

                <input 
                    type='text' 
                    placeholder="Image..." 
                    name="image" 
                    value={input.image}
                    onChange = {clickEvent => handleChanges(clickEvent)}
                />

                <input 
                    type='text'
                    placeholder='Released...'
                    name='released'
                    value={input.released}
                    onChange={clickEvent => handleChanges(clickEvent)}   
                />

                <input 
                    type='number'
                    placeholder='Rating...'
                    name='rating'
                    value={input.rating}
                    onChange={clickEvent => handleChanges(clickEvent)}   
                />

                <select name="genres" onChange={(event) => genresHandler(event)}>
                    <option value="" defaultValue="">Select Genres</option>
                </select>

                <select name="platform" onChange={(event) => platformHandler(event)}>
                    <option value="" defaultValue="">Select platforms</option>
                </select>
                <input type='submit' value='Create Recipe' />
            </form>
        </div>
    );
}