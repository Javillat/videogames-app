const { Router } = require('express');
const genro = require('../controllers/genrofn.js');

const routerfn = Router();

routerfn.get('/', genro.genres);

module.exports = routerfn;