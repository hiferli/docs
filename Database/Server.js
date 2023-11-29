import express, { json } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';

const app = express();
app.use(cors())
app.use(json())

const PORT = 2000;
const URI = 'mongodb://0.0.0.0:27017';

const start = async () => {
    try {
        await mongoose.connect(
            URI
        );

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
