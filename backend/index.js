import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Room } from "./models/roomModel.js"

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN')
});

app.post('/rooms', async (request, response) => {
    try {

        if (
            !request.body.room ||
            !request.body.floor
        ) {
            return response.status(400).send({
                message: 'Send all required fields: room, floor',
            })
        }
        const newRoom = {
            room: request.body.room,
            floor: request.body.floor,
            isActive: request.body.isActive,
        }
        const room = await Room.create(newRoom);
        return response.status(201).send(room);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

app.get('/rooms', async (request, response) => {
    try {

        const rooms = await Room.find({});
        return response.status(200).json({
            count: rooms.length,
            data: rooms
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

app.get('/rooms/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const room = await Room.findById(id);
        return response.status(200).json(room);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

app.put('/rooms/:id', async (request, response) => {
    try {
        if (
            !request.body.room ||
            !request.body.floor
        ) {
            return response.status(400).send({
                message: 'Send all required fields: room, floor',
            })
        }

        const { id } = request.params;
        const result = await Room.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Room not found' });
        }
        return response.status(200).send({ message: 'Room updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

app.delete('/rooms/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Room.findByIdAndDelete(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Room not found' });
        }
        return response.status(200).send({ message: 'Room deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

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