const { Router } = require('express');
const videogame = require('../controllers/videogamesfn.js');

const routerfn = Router();

routerfn.get('/', videogame.allVideogames);

module.exports = routerfn;