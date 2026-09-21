import express from 'express'
import controller from './controller.js'

const actorRoutes = express.Router()

actorRoutes.post('/actor', controller.handleInsertActorRequest)

actorRoutes.get('/actores', controller.handleGetActoresRequest)

actorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest)

//Se modifica URI apuntando a actores, dado que la misma URL /actor/:id o /actor/:idPelicula se duplican. 
//Se propone solucionar indicando que se obtendrán todos los /actores segun la :idPelicula
actorRoutes.get('/actores/:idPelicula', controller.handleGetActoresByPeliculaIdRequest)


export default actorRoutes 
 




