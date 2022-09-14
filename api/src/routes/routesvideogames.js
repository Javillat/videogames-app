const { Router } = require('express');
const videogame = require('../controllers/videogamesfn.js');

const routerfn = Router();

routerfn.get('', videogame.videogameByName);
routerfn.get('/:id', videogame.videogameById);
routerfn.post('/', videogame.postVideogames);

module.exports = routerfn;