import express, { json } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import NotepadModel from './NotepadModel.js';

const app = express();
app.use(cors())
app.use(json())

const PORT = 2000;
const URI = 'mongodb://0.0.0.0:27017';

const start = async () => {
    try {
        await mongoose.connect(
            URI
        ).then(() => console.log('Database connected'))
        .catch(() => console.log('Error connecting Database'));

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.get('/getText' , async (request , response) => {
    try {
        const storedText = await NotepadModel.findOne({_id: 1});

        if(storedText !== null){
            return response.status(201).json({
                "Message": "Text Found",
                "storedText": storedText
            })
        }

        return response.status(201).json({
            "Message": "No Records Found"
        })
    } catch (error) {
        return response.status(500).json({
            'Message': error.message
        })
    }  
})

app.post('/storeText' , async (request , response) => {
    try {
        const text = request.body.text;
        const timestamp = request.body.timestamp

        const search = await NotepadModel.findOne({_id: 1});
        
        if(search !== null){
            const result = await NotepadModel.findOneAndUpdate({_id: 1} , {'text': text, 'timestamp': timestamp});
            return response.status(201).json({
                'Message': "Saved Successfully",
                "Result": result
            })
        } 

        const newEntry = await NotepadModel.create({
            "_id": 1,
            "text": text,
            "timestamp": timestamp
        })

        const result = await newEntry.save();

        return response.json({
            "Message": "Created Successfully",
            "Result": result
        })
    } catch (error) {
        return response.status(500).json({
            'Message': error.message
        })
    }
})