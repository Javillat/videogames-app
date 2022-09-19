import React from 'react';

export default function Pagination({videogames, gamesByPage, page}){
    const pageNumbers = [];
    for(let i = 0; i < Math.ceil(videogames/gamesByPage); i++){
        pageNumbers.push(i+1);
    }
    return <div>
        {pageNumbers.map(number => 
            <button key={number} onClick={() => page(number)}>{number}</button>
            )}
    </div>
}