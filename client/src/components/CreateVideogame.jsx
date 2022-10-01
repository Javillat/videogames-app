import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import '../css/Form.css'


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
        //event.preventDefault();
        if(!send.genreid.includes(event.target.value))
        setSend({
            ...send,
            genreid:[...send.genreid, event.target.value]
        })
        console.log(send.genreid);
    }

    const platformHandler = (event) => {
        //event.preventDefault();
        if(!send.platforms.includes(event.target.value))
        setSend({
            ...send,
            platforms:[...send.platforms, event.target.value]
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
        // .catch(function (error){
        //     if(error.response.status === '304')
        //         alert('Videogame allready exist into db, not modyfied')
        // })
        alert(`Videogame ${send.name} succefull created`);
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
    // const goBack = (event) => {
    //     <Link to='/home'></Link>
    //     //history.push('/home');
    // }
    return(
        <div className="create_videogames">
            <form onSubmit={(evt) => submitVideogames(evt)}>
                <input className="inputs"
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

                <input className="inputs"
                    type='text' 
                    placeholder="Image..." 
                    name="image" 
                    value={send.image}
                    onChange = {clickEvent => handleChanges(clickEvent)}
                />

                <input className="inputs"
                    type='date'
                    placeholder='Released...'
                    name='released'
                    value={send.released}
                    onChange={clickEvent => handleChanges(clickEvent)}   
                />

                <input className="inputs"
                    type='number'
                    placeholder='Rating...'
                    name='rating'
                    value={send.rating}
                    onChange={clickEvent => handleChanges(clickEvent)}   
                />

                <select name="genreid" onChange={(event) => genresHandler(event)}>
                    <option value="" defaultValue="">Select Genres</option>
                    {genros.map(genro => (
                        <option key={genro.id} value={genro.id}>{genro.name}</option>
                    ))}
                </select>

                <select name="platform" onChange={(event) => platformHandler(event)}>
                    <option value="" defaultValue="">Select platforms</option>
                    <option value="PC">PC</option>
                    <option value="Xbox">Xbox</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="Xbox 360">Xbox 360</option>
                    <option value="Atari">Atari</option>
                    <option value="Nintndo 64">Nintndo 64</option>
                </select>
                <input type='submit' value='Create Recipe' />
            </form>
            <Link to='/home'><button>Go Back</button></Link>
            
        </div>
    );
}