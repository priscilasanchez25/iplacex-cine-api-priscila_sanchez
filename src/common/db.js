import { MongoClient, ServerApiVersion } from "mongodb";
 

const uri = 'mongodb+srv://eva3_express:eva12345@cluster-express.3d6lyfz.mongodb.net/?appName=cluster-express'

const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationerrors: true } })


export default client