import { ObjectId } from "mongodb";
import client from '../common/db.js'
import { Actor } from "./actor.js";

const actorCollection = client.db('cine-db').collection('actor')

const peliculaCollection = client.db('cine-db').collection('pelicula')

async function handleInsertActorRequest(req, res) {
    let data = req.body
    let actor = Actor
    actor.edad = actor.edad
    actor.estaRetirado = data.estaRetirado
    actor.idPelicula = data.idPelicula
    actor.premios = data.premios
    actor.nombre = data.nombre
   //No se pudo ir a comparar por nombre de pelicula porque en actor solo tengo el IdPelicula para validar.
    let oidPelicula = ObjectId.createFromHexString(actor.idPelicula)

    peliculaCollection.findOne({ _id: oidPelicula }).then((data) => {
        if (data === null) return res.status(404).send('ID de Pelicula no existe')
    })

    await actorCollection.insertOne(actor).then((data) => {
        if (data === null) return res.status(400).send('Error al guardar registro')

        return res.status(201).send(data)
    }).catch((e) => {
        return res.status(500).send({ error: e })
    })
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find().toArray()
        .then((data) => {
            return res.status(200).send(data)
        }).catch((e) => {
            return res.status(500).send({ error: e })
        })
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id
    try {
        let oid = ObjectId.createFromHexString(id)
        await actorCollection.findOne({ _id: oid }).then((data) => {
            if (data === null) return res.status(404).send(data)
            return res.status(200).send(data)
        }).catch((e) => {
            return res.status(500).send(data)
        })

    } catch (e) {
        return res.status(400).send('Id mal formado')
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    //Se captura idPelicula para buscar actores relacionados
    //Se considera el idPelicula segun instrucción de tabla de definición de firma método. Es la siguiente:
    //handleGetActoresByPeliculaIdRequest	{ }	debe obtener todos los actores de una película en base al _id de la película 
    let idPelicula = req.params.idPelicula
    try {
        let query = { idPelicula: idPelicula }
        await actorCollection.find(query).toArray().then((data) => {
            return res.status(200).send(data)
        }).catch((e) => { return res.status(400).send({ code: e.code }) })
    } catch (e) {
        return res.status(400).send("Id pelicula no encontrado " + idPelicula)
    }
}



export default {
    handleGetActoresRequest,
    handleInsertActorRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}