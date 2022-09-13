const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogame = require('./routesvideogames');
const genro = require('./routesgenro');


const routerMain = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
routerMain.use('/videogames', videogame);
routerMain.use('/genres', genro);
// routerMain.use('/genro', genro);


module.exports = routerMain;
