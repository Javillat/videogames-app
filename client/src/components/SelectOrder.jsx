import React from "react";
//import OrderByName from "./helpers/Selecters";
import { useDispatch } from "react-redux";
import { orderByNameAction, orderByRatingAction } from "./redux/actions/Actions";


export default function SelectOrder(props){
    const dispatch = useDispatch()
    //const ordered = useSelector(data => data.videogames)

    function orderByName(event){
        event.preventDefault()
        dispatch(orderByNameAction(event.target.value));
        if(event.target.value === 'ASCENDENT')
        props.setCurrentPage(1);
        else props.setCurrentPage(2);
    }

    function orderByRating(event){
        event.preventDefault();
        dispatch(orderByRatingAction(event.target.value));
        if(event.target.value === 'DESCENDENT')
        props.setCurrentPage(2);
        else props.setCurrentPage(1);
    }

    return(
        <div className="order_selector">
            <select className="select_order_name" 
            onChange={(event)=> orderByName(event)}>
                <option value="" defaultValue="">Sort by Name</option>
                <option value="DESCENDENT">Descendent</option>
                <option value="ASCENDENT">Ascendent</option>
            </select>

            <select name="selec_order_rating" 
            onChange={(event) => orderByRating(event)}>
                <option value="" defaultValue="">Sort by Rating</option>
                <option value="DESCENDENT">Descendent</option>
                <option value="ASCENDENT">Ascendent</option>
            </select>
        </div>
    )
}