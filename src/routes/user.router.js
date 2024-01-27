const { getAll, create, getOne, deleteOne, putOne } = require('../controllers/user.controller');
const express = require('express');

const userRouter = express.Router();

//RUTAS ESTATICAS
userRouter.route("/") // ==> lo que aparecera es localhost:8080/users
.get(getAll)
.post(create)



//CREAMOS NUESTRAS RUTAS DINAMICAS
//LAS CREAMOS PARA CUANDO SE TRATE DE MOSTRAR POR SU ID
userRouter.route("/:id")
	.get(getOne)
	.delete(deleteOne)
	.put(putOne)

module.exports = userRouter;