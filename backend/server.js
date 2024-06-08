import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import routers from './routes/routes.js'
import dbCon from "./utlis/db.js";
import UserModel from "./models/Users.js";



dotenv.config()
const app=express()
dbCon()
app.use(cors())
app.use(express.json())
app.use('/api',routers)

// User routes
app.get('/getUser', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
});


app.listen(process.env.PORT,()=>{
    console.log('server is running')
})