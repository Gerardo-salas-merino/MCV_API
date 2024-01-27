// 1.- IMPORTAMOS EL MODELO
// 2.- CREAMOS LA LOGICA DEL CONTROLADOR
// 3.- EXPORTAMOS EL CONTROLADOR
const catchError = require('../utils/catchError');
const User = require('../models/User');



/* 
    PETICION => GET
    para mostrar todos los registros de la tabla users
*/ 

const getAll = catchError(async(req, res) => {
    // Operaciones...

    /**el metodo findAll es lo mismo que select * from en SQL
     * pasamos el nombre del modelo 
     * despues el metodo .findAll()
     *  guardamos en una variable. y retornamos el modelo
    */
    const users = await User.findAll()

    return res.json(users)
});


/* 
    1.- PETICION => POST
    2.- para crear un nuevo registro en la tabla users 
    3.- asi mismo es la estructura de un controlador

*/
const create = catchError(async (req, res) => {
   /* 
        OPERACIONES...
        1.- desestructuramos el body y creamos un nuevo objeto 
        con los mismos nombres de los campos
        2.- cuando creemos el usuario debemos poner el nombre del modelo
   */
    const { first_name, last_name, email, password, birthday } = req.body
    
    const newBody = { first_name, last_name, email, password, birthday }

    const user = await User.create(newBody)
    
    return res.status(201).json(user)
});

/* 
  1.- PETICION => GET por (id).
  2.- para mandar a mostrar en esta ocacion un user por su (id)
  3.- asi mismo esta la estructura de esta peticion.  
*/
const getOne = catchError(async (req, res) => {
    const { id } = req.params

    //buscar nuestro carro por ID
    const user = await User.findByPk(id)

    if (!user) res.sendStatus(404)
    return res.json(user)
});

/* 
    1.- PETICION => DELETE por su (id).
    2.- esto para eliminar un registro(usuario), por su id.
    3.- asi mismo la estructura de esta peticion.
    
*/
const deleteOne = catchError(async (req, res) => {
    const { id } = req.params

    const user = await User.destroy({where: { id }})

    if (!user) res.sendStatus(404)

    return res.send("USER DELETED").status(204)
})

/* 
    1.- PETICION => PUT por su id.
    2.- esto para actualizar informacion de un usuario por su id.
    3.- asi mismo la estructura de esta peticion.
*/
const putOne = catchError(async (req, res) => {
    //desestructuramos el id de los parametros
    const { id } = req.params

    //pasamos los capos que quiero actualizar de mi tabla (users).
    //si no paso un capo, ese no se podra actualizar, es necesario pasar todos
    const { first_name, last_name, email, password, birthday } = req.body

    //Creamos el nuevo objeto donde se guardara la nueva informacion
    const newBody = {first_name, last_name, email, password, birthday}
    
    //creamos un nuevo objeto con los datos ya actualizados y los guardamos en una variable
    const user = await User.findByPk(id)
    
    //verificamos si existe el usuario en nuestra tabla (users)
    //si no se encuentra nos retornara un error 404 not fund
    //si se encuentra no mostrara nada
    if (!user) return res.sendStatus(404)


    const userUpdate = await User.update(
        newBody,
        { where: { id }, returning: true }
    )
    return res.json(userUpdate[1][0])


})

module.exports = {
    getAll,
    create,
    getOne,
    deleteOne,
    putOne
}
