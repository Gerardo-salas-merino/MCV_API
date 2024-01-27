const { getAll, create, getOne, destroy, update } = require('../controllers/car.controller');
const express = require('express');

const carRouter = express.Router();

/* 
	1.- desestructurar el getAll del controlador
	2.- creamos una const y nombre del router(carRouter)
	3.- diremos que el carRouter sera de tipo .get(getAll)

*/
carRouter.route("/") //  <- /car
	.get(getAll)
	.post(create)


//RUTAS DINAMICAS
carRouter.route("/:id") // /cars/1
.get(getOne)
.delete(destroy)
.put(update)


module.exports = carRouter;