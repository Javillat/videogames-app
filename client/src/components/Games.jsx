import React, { useState } from "react";
import Game from "./Game";
//import Loading from './Loading';
import Pagination from './Pagination';

export default function Games(propsHome){
    console.log(propsHome);
    const [currentPage, setCurrentPage] = useState(1);
    const gamesByPage = 15;
    const lastVideogame = currentPage * gamesByPage;
    const firstVideogame = lastVideogame - gamesByPage;
    const currentVideogames = propsHome.videogames.length ? propsHome.videogames.slice(firstVideogame, lastVideogame) : [];

    //console.log('15', currentVideogames);
    const Page = (page) => {
        setCurrentPage(page)
    }
    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if (prevPage < 1) return;
        setCurrentPage(prevPage)
    }
    const nextHandler = () => {
        const totalVideogames = propsHome.videogames.length;
        const nextPage = currentPage + 1;
        if (currentPage === 7 && totalVideogames) return;
        setCurrentPage(nextPage);
    }
    return(
        <div>
            <span>
                <Pagination gamesByPage = {gamesByPage} videogames={propsHome.videogames.length} page={Page} />
            </span>

            {currentVideogames !== undefined
            
            ? (currentVideogames.map(videogame => (
                <div key={videogame.id}>
                    <Game
                        id={videogame.id}
                        name={videogame.name}
                        genres={videogame.genres}
                        image={videogame.image}
                        />
                </div>
            ))
            ) : ('No hay videogames') //(<Loading></Loading>)
            }
            <div> Pag {currentPage}</div>
                {currentPage !== 1 ? <button onClick={prevHandler}>Previous</button> : null}
                <Pagination gamesByPage = {gamesByPage} videogames={propsHome.videogames.length} page={Page} />
                {currentPage !== 7 ? <button onClick={nextHandler}>Next</button> : null}
        </div>
        );
}