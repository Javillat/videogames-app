import React, { useState } from "react";
import Game from "./Game";
import Loading from './Loading';
import Pagination from './Pagination';

export default function Games(propsHome){
    console.log('e ',propsHome.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const gamesByPage = 15;
    const lastVideogame = currentPage * gamesByPage;
    const firstVideogame = lastVideogame - gamesByPage;
    const currentVideogames = (propsHome.videogames !== undefined) ? propsHome.videogames.slice(firstVideogame, lastVideogame) : [];

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
            {/* <span>
                <Pagination gamesByPage = {gamesByPage} videogames={propsHome.videogames.length} page={Page} />
            </span> */}

            { propsHome.videogames > 0 || propsHome.videogames !== undefined
            
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
            ) : (<Loading />)//('No hay videogames') //(<Loading></Loading>)
        }
        <div> Pag {currentPage}</div>
            {currentPage !== 1 ? <button onClick={prevHandler}>Previous</button> : null}
                <Pagination gamesByPage = {gamesByPage} videogames={100} page={Page} />
            {currentPage !== 7 ? <button onClick={nextHandler}>Next</button> : null}
        </div>
        );
}