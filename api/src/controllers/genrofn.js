const { Genro } = require('../db'); 
const axios = require('axios');

/**
 * ENDPOINT GENRES
 * Función que trae en una primera instancia los datos desde la API externa y una vez traida 
 * la guarda en la base de datos para luego ser usada directamente y poner a disposición del front.
 * 
 * READY
 */

chargeGenres = async(req, res) => {
    const genbd = await Genro.findAll();
    try {
        if (genbd.length > 0) {
            console.log('The genres already exist in the bd!!!');
            //return genbd;
        }else{
            const genapi = (await axios.get('https://api.rawg.io/api/genres?key=a42826a1dd4d4812bfce2f3614450df1')).data.results;
            //console.log('api ',genapi);
            const create = genapi.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                }
            })
            await Genro.bulkCreate(create);
            console.log('Genres saved succeffully!!!'); 
        }
    } catch (error) {
        console.log(error);
    }
}
//================================================================

/**
 * ENDPOINT QUE TRAE LOS GENEROS DESDE LA BD PREVIAMENTE TRAIDO DESDE LA API EXTERNA 
 * Y GUARDADOS AL LEVANTAR EL SERVIDOR.
 * 
 * LA FUNCIÓN PONE A DISPOSICIÓN LOS DATOS AL FRONT
 * 
 * READY
 */

 genres = async (req, res) => {
    try {
        const genbd = await Genro.findAll();
        console.log('bd ',genbd);
        return res.status(200).send(genbd)
        //(typeof genbd !== 'undefined' && genbd.length === 0) ?  
    } catch (error) {
        
    }
 }
 //==================================================================

module.exports = {
    chargeGenres,
    genres,
}