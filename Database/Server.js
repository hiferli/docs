import express, { json } from 'express';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(json())

const PORT = process.env.PORT || 2000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

