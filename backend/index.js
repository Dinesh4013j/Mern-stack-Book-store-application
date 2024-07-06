import express from "express";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { Book } from "./models/bookModels.js";
import e from "express";
import cors from 'cors';
import booksRoute from './routes/booksRoute.js'
const app=express();
app.use(express.json())

// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['content-Type']
//     })
// )
app.use(cors())
app.get('/',(req,res)=>{
    console.log(req)
    res.status(234).send("This is my mernStack first Project")
})

app.use('/books',booksRoute)


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("mongoose connected ")
        app.listen(PORT,()=>{
            console.log(`app listening on ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

