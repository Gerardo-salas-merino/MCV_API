const catchError = require('../utils/catchError');
const Car = require('../models/Car');

const getAll = catchError(async(req, res) => {
    // Operaciones...

     /**el metodo .findAll() es lo mismo que select * from en SQL
     * pasamos el nombre del modelo 
     * despues el metodo .findAll()
     *  guardamos en una variable la info que nos llega. y retornamos el modelo
    */
   const cars = await Car.findAll()

    return res.json(cars)
});

//Estructura de un controller
//CREAR UN CARRO
const create = catchError(async(req, res) => {
    const { brand, model, year, color } = req.body

    const newBody = { brand, model, year, color }

    const car = await Car.create(newBody)

    return res.status(201).json(car)


});

//MOSTRAR UN SOLO CARRO POR ID
const getOne = catchError(async (req, res) => {
    const { id } = req.params

    //buscar nuestro carro por ID
    const car = await Car.findByPk(id)

    if (!car) res.sendStatus(404)
    return res.json(car)
});

//ELIMINAR UN CAR POR ID
const destroy = catchError(async(req, res) => {
    const { id } = req.params

    const car = await Car.destroy({where: { id }})

    if (!car) res.sendStatus(404)

    return res.send("car deleted").status(204)
});

//ACTUALIZAR
const update = catchError(async (req, res) => {
    //desestructuramos
    const { id } = req.params

    //lo que quiero actualizar de la tabla, si no paso un campo no se actualizara
    const { brand, model, year, color } = req.body

    const newBody = { brand, model, year, color }

    const car = await Car.findByPk(id)
    //verificamos si el usuario existe
    if (!car) return res.sendStatus(404)
    
    //Alternativa clasica en caso de que si se encuentre el car
    const userUpdate = await Car.update(
        newBody,
        { where: { id }, returning: true }
    )
    return res.json(userUpdate[1][0])


    //version Avanzada
    // const userUpdate = await user.update(
    //     newBody,

    // )


    // return res.send(userUpdate)

})





module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}