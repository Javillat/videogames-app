import React from "react";
//import OrderByName from "./helpers/Selecters";
import { useDispatch } from "react-redux";
import { orderByNameAction } from "./redux/actions/Actions";


export default function SelectOrder(props){
    const dispatch = useDispatch()
    //const ordered = useSelector(data => data.videogames)

    function orderByName(event){
        event.preventDefault()
        dispatch(orderByNameAction(event.target.value));
        props.setCurrentPage(1);
    }

    return(
        <select className="select_order_name" 
        onChange={(event)=> orderByName(event)}>
            <option value="" defaultValue="">Sort by Name</option>
            <option value="ASCENDENT">Ascendent</option>
            <option value="DESCENDENT">Descendent</option>
        </select>
    )
}