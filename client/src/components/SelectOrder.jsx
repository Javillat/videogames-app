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
        if(event.target.value === 'ASCENDENT')
        props.setCurrentPage(1);
        else props.setCurrentPage(2);
    }

    return(
        <select className="select_order_name" 
        onChange={(event)=> orderByName(event)}>
            <option value="" defaultValue="">Sort by Name</option>
            <option value="DESCENDENT">Descendent</option>
            <option value="ASCENDENT">Ascendent</option>
        </select>
    )
}