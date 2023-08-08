import bodyParser from "body-parser";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3001

const url = process.env.NODE_ENV ? 'mongodb://0.0.0.0:27017' : 'mongodb://mongo-db:27017'
console.log(url)
const client = new MongoClient(url);

client.connect();
const db = client.db("local")
const collection = db.collection("users")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const getUsers = async (request, response) => {
    const users = await collection.find().toArray()
    response.json(users)
}

const createUsers = async (request, response) => {
    await collection.insertOne(request.body)
    response.status(201).json(request.body)
}

const deleteUser = async (request, response) => {
    await collection.deleteOne({ _id: new ObjectId(request.params.id) })
    response.sendStatus(204)
}

app.get('/users', getUsers)
app.post('/users', createUsers)
app.delete('/users/:id', deleteUser)

app.listen(port, () => console.log(`Listening on ${port}`))