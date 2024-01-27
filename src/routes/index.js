const express = require('express');
const userRouter = require('./user.router');
const carRouter = require('./car.router');
const router = express.Router();

// colocar las rutas aquí
//Creacion de las rutas aqui
router.use('/users', userRouter)
router.use('/cars', carRouter)


module.exports = router;
/*  
    1.- importamos el archivo .router
    2.-creamos la sintaxis de router.use("nombre de la ruta", y la ruta)
*/