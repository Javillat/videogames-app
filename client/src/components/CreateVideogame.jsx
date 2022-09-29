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

    const handleChanges = (event) => {
       setSend({
        ...send,
        [event.target.name]:event.target.value
       })
    }

    const genresHandler = (event) => {
        if(!send.genreid.includes(event.target.value))
        setSend({
            ...send,
            genreid:[...send.genreid, event.target.value]
        })
        console.log(send.genreid);
    }

    const platformHandler = (event) => {
        if(!send.platforms.includes(event.target.value))
        setSend({
            ...send,
            platforms:[...send.platforms. event.target.value]
        })
    }

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
                    value={send.name}
                    onChange={clickEvent => handleChanges(clickEvent)}
                />

                <textarea 
                    type='text'
                    placeholder='Description...'
                    name='description'
                    value={send.description}
                    onChange={clickEvent => handleChanges(clickEvent)}
                />

                <input 
                    type='text' 
                    placeholder="Image..." 
                    name="image" 
                    value={send.image}
                    onChange = {clickEvent => handleChanges(clickEvent)}
                />

                <input 
                    type='date'
                    placeholder='Released...'
                    name='released'
                    value={send.released}
                    onChange={clickEvent => handleChanges(clickEvent)}   
                />

                <input 
                    type='number'
                    placeholder='Rating...'
                    name='rating'
                    value={send.rating}
                    onChange={clickEvent => handleChanges(clickEvent)}   
                />

                <select name="genreid" onChange={(event) => genresHandler(event)} multiple>
                    <option value="" defaultValue="">Select Genres</option>
                    {genros.map(genro => (
                        <option key={genro.id} value={genro.id}>{genro.name}</option>
                    ))}
                </select>

                <select name="platform" onChange={(event) => platformHandler(event)}>
                    <option value="" defaultValue="">Select platforms</option>
                </select>
                <input type='submit' value='Create Recipe' />
            </form>
        </div>
    );
}