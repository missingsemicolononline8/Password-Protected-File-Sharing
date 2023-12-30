const connectToMongo = require('./db');
const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const port = 5000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/api/v1/files',require('./routes/files'));
app.use('/uploads', express.static('uploads'))

connectToMongo()


app.get("/health", (req,res) => {
    res.status(200)
    res.send("Server is Up & Running");
})

app.listen(port,() => {
    console.log('SHareX backend listening on port http://localhost:',port)
});
