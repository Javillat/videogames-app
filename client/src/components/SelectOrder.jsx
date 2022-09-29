import React from "react";
import axios from "axios";
//import OrderByName from "./helpers/Selecters";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { orderByNameAction, orderByRatingAction, filterByGenreAction, filterByBdApiAction } from "./redux/actions/Actions";

export default function SelectOrder(props){
    const dispatch = useDispatch()
    const [genros, setGenros] = useState([]);

    function orderByName(event){
        event.preventDefault()
        dispatch(orderByNameAction(event.target.value));
        if(event.target.value === 'ASCENDENT')
        props.setCurrentPage(1);
        else props.setCurrentPage(2);
        //props.setCurrentPage(1);
    }

    function orderByRating(event){
        event.preventDefault();
        dispatch(orderByRatingAction(event.target.value));
        if(event.target.value === 'DESCENDENT')
        props.setCurrentPage(2);
        else props.setCurrentPage(1);
    }

    function filterByGenre(event){
        event.preventDefault();
        const value = event.target.value;
        if(value === 'Board Games' || value === 'Educational' || value === 'Card'){
            alert(`Juegos con genero ${event.target.value} no traidos en los primeros 100 de la API`)
        }else{
            dispatch(filterByGenreAction(event.target.value));
            props.setCurrentPage(1);
        }
        // if(event.target.value === 'ASCENDENT')
        // props.setCurrentPage(1);
        // else props.setCurrentPage(2);
    }
    
    function filterByBdApi(event){
        event.preventDefault();
        dispatch(filterByBdApiAction(event.target.value));
        props.setCurrentPage(2);
    }

    useEffect(()=>{
        axios.get('http://localhost:3001/genres').then((response) =>{
             setGenros(response.data);
             console.log('useeffect ',genros);
         })
    },[])

    return(
        <div className="order_selector">
            <section>
                <select className="select_order_name" 
                onChange={(event)=> orderByName(event)}>
                    <option value="" defaultValue="">Sort by Name</option>
                    <option value="DESCENDENT">Descendent</option>
                    <option value="ASCENDENT">Ascendent</option>
                </select>
            </section>

            <section>
                <select name="selec_order_rating" 
                onChange={(event) => orderByRating(event)}>
                    <option value="" defaultValue="">Sort by Rating</option>
                    <option value="DESCENDENT">Descendent</option>
                    <option value="ASCENDENT">Ascendent</option>
                </select>
            </section>

            <section>
                <select name="select_genre" 
                onChange={(event) => filterByGenre(event)}>
                    <option value="" defaultValue="">Filter by Genro</option>
                    {console.log('select',genros)}
                    {genros.map(genro => ( 
                            <option key={genro.id} value={genro.name}>{genro.name}</option>
                        ))
                    }
                </select>
            </section>
            <section>
                <select name="select_bd_api" 
                onChange={(event) => filterByBdApi(event)}>
                    <option value="" defaultValue="">Filter by API/BD</option>
                    <option value="BD">Filter from BD</option>
                    <option value="API">Filter from API</option>
                </select>
            </section>
        </div>
    )
}