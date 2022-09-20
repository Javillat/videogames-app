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
 * READY
 * ==============================================================================================
 */

getVideogames = async() => {
    try {
        const videogames_array = [];
        for (let i = 1; i <= 5; i++){
            const getapi = (await axios.get(`https://api.rawg.io/api/games?key=${Key}&page=${i}`)).data.results;
            //console.log(getapi);
            //videogames_array.push(getapi);
            const mapapi = getapi.map(item => {
                return {
                    id: item.id,
                    image: item.background_image,
                    name: item.name,
                    genres: item.genres.map(genre =>  genre.name).join(', ')
                    // return {
                        //     name: genre.name
                        // }
                        //)//fin genres
                    }
                })//fin getapi
                videogames_array.push(mapapi);
            }
                
        const getbd = await Videogame.findAll({
                include: {
                    model: Genro,
                    attributes: ['name'],
                    through: {attributes:[]},
                    //required:true
                },
        });//Traer los generos de la bd
        //console.log(getbd);
        const tofront = videogames_array.flat();
        return [...tofront,...getbd];

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
    return item //res.status(200).send(item);
}
//==============================================================

/**
 * FUNCIÓN QUE TRAE DESDE LA API EXTERNA Y LA BD LOS DATOS REFERENTES A UN JUEGO 
 * EN PARTICULAR, DISCRIMINADO POR EL ID.
 * 
 * READY
 */

videogameById = async(req, res) => {
    const { id } = req.params;
    const idUPPER = id.toUpperCase();
    try {
        const getFromBD = await Videogame.findOne({
            where:{id:idUPPER},
            include:{
                model:Genro,
                attributes:['name'],
                through:{attributes:[]},
            }
        });

        console.log('BD', getFromBD);
        if (getFromBD) {
            return res.status(200).send(getFromBD);
        }else{
            const getFromAPI = (await axios.get(`https://api.rawg.io/api/games/${idUPPER}?key=${Key}`));
            console.log(getFromAPI);
            const { id, name, background_image, genres, description, released, rating, platforms } = getFromAPI.data;
            const gotdata = {
                id:id,
                name:name,
                image:background_image,
                genres: genres.map(genro => genro.name).join(', '),
                description:description.replace(/<[^>]*>?/g, ''),
                released:released,
                rating:rating,
                platforms: platforms.map(platform => platform.platform.name).join(', ')
            }
            return res.status(200).send(gotdata);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(`Id ${id}, not found!!!`)
    }
}
//=============================================================

/**
 * FUNCIÓN QUE PROCESA LA PETICIÓN DE INFORMACIÓN DESDE LA API EXTERNA Y BD 
 * DEPENDIENDO DE SI LA PETICIÓN TRAE POR QUERY 'name' PROCESA Y ENVÍA UN FILTRO POR
 * NOMBRE, DE LO CONTRARIO, ENVÍA TODOS LOS VIDEOJUEGOS.
 * 
 * READY 
 */
videogameByName = async(req, res) => {
    try {
        const allvideogames = await allVideogames();
        const { name } = req.query;
        if(name){
            console.log(name);
            const videogames = await getVideogames();
            const filterName = videogames.filter(vgame => {
                const datalower = vgame.name.toLowerCase();
                const namelower = name.toLowerCase();
                if (datalower.includes(namelower)) {
                    return vgame;
                }
            });
            filterName.length ? res.status(200).send(filterName.splice(0,15)) : res.status(404).send('Game not found');
        }else{
            return res.status(200).send(allvideogames);
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Endpoint que trae desde el front, recogida desde un formulario controlado, y enviada por body los parametros necesarios para guardar 
 * información dentro de la base de datos.
 * AGREGA EL ID COMO STRING CON EL PREFIJO BD- MAS UN NUMERO AUTOINCREMENTAL.
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
    //allVideogames,
    videogameById,
    postVideogames,
    videogameByName,
}