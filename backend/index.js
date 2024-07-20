import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import roomsRoute from './routes/roomsRoute.js';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN')
});

app.use('/rooms', roomsRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App Is Listening To Port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })