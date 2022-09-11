const axios = require('axios');
const { Videogames, Genro } = require('../db');
const { Op } = require('sequelize');
const { Key } = process.env;


/**
 * ENDPOINT RUTA PRINCIPAL
 * 
 * OBTENER LOS DATOS DE LA API EXTERNA Y LA BASE DE DATOS, COMPILARLOS
 * PONERLOS A DISPOSICIÓN DE ALLVIDEOGAMES PARA EL FRONT
 * 
 * NOT READY JET
 * ==============================================================================================
 */

getVideogames = async() => {
    try {
        const getapi = (await axios.get(`https://api.rawg.io/api/games?key=${Key}`)).data.results;
        console.log(getapi);
        const mapapi = getapi.map(item => {
            return {
                image: item.background_image,
                name: item.name,
                genres: item.genres.map(genre => {
                    return {
                        name: genre.name
                    }
                })
            }
        })
        //const getbd = await Videogames.findAll()
        return [...mapapi];

    } catch (error) {
        console.log(error);   
    }
}

/**
 * FUNCIÓN QUE LLAMA A GETVIDEOGAMES TOMA LOS DATOS ASIGNANDOLOS A ITEM 
 * Y SIRVIENDOLOS AL FRONT
 * 
 * READY
 * ============================
 */

allVideogames = async(req, res) => {
    const item = await getVideogames();
    return res.status(200).send(item);
}



module.exports = {
    allVideogames,
}