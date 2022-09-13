const axios = require('axios');
const { Videogame, Genro } = require('../db');
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
        //const videogames_array = [];
        //for (let i = 1; i <= 5; i++){
            const getapi = (await axios.get(`https://api.rawg.io/api/games?key=${Key}&page_size=100`)).data.results;
            //console.log(getapi);
            //videogames_array.push(getapi);
        //}
            const mapapi = getapi.map(item => {
                return {
                    id: item.id,
                    image: item.background_image,
                    name: item.name,
                    genres: item.genres.map(genre =>  genre.name)
                        // return {
                        //     name: genre.name
                        // }
                        //)//fin genres
                }
            })//fin getapi
            
        const getbd = await Videogame.findAll({
                include: {
                    model: Genro,
                    attributes: ['name'],
                    through: {attributes:[]},
                    //required:true
                },
        });//Traer los generos de la bd
        console.log(getbd);
        return [...mapapi,...getbd];

    } catch (error) {
        console.log(error);   
    }
}
//==============================================================

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
//==============================================================

/**
 * FUNCIÓN QUE TRAE DESDE LA API EXTERNA Y LA BD LOS DATOS REFERENTES A UN JUEGO 
 * EN PARTICULAR, DISCRIMINADO POR EL ID.
 * 
 * NOT READY JET
 */

videogameById = async(req, res) => {
    
}
//=============================================================

/**
 * Endpoint que trae desde el front, recogida desde un formulario controlado, y enviada por body los parametros necesarios para guardar 
 * información dentro de la base de datos.
 * 
 * _isAttribute: [Function (anonymous)],
 * getGenros: [Function (anonymous)],
 * countGenros: [Function (anonymous)],
 * hasGenro: [Function (anonymous)],
 * hasGenros: [Function (anonymous)],
 * setGenros: [Function (anonymous)],
 * addGenro: [Function (anonymous)],
 * addGenros: [Function (anonymous)],
 * removeGenro: [Function (anonymous)],
 * removeGenros: [Function (anonymous)],
 * createGenro: [Function (anonymous)]
 * 
 * READY
 *
 */

postVideogames = async(req, res) => {
    const { name, description, image, released, rating, platforms, genreid } = req.body;
    try {
        const findone = await Videogame.findOne({//Buscar en la bd si el nombre existe, sino existe crearlo.
            where:{name: {[Op.eq]:name}}
        });
        if(!findone){
            const idCount = (await Videogame.count()) + 1;
            const idString = 'BD-' + idCount;
            const videogame = await Videogame.create({
                id: idString,
                name: name,
                description: description,
                image:image,
                released: released,
                rating: rating,
                platforms:platforms
            })
            //console.log(videogame.__proto__);
            await videogame.addGenros(genreid)
            return res.status(201).send('Videogame succefull created');
        }else{
            return res.status(304).json('Videogame already exist into db. Not modyfied');
        }
    } catch (error) {
        console.log(error);
    }
}
//==============================================================


module.exports = {
    allVideogames,
    videogameById,
    postVideogames,
}