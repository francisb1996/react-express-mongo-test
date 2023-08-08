import bodyParser from "body-parser";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = 3001

console.log(process.env.MONGODB_URI)
const client = new MongoClient('mongodb://0.0.0.0:27017');

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
    response.json(request.body)
}

app.get('/api/users', getUsers)
app.post('/api/users', createUsers)

app.listen(port, () => console.log(`Listening on ${port}`))