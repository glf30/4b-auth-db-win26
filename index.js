const express = require('express');
const logger = require("morgan");

const connectToMongoDB = require("./database/connectToMongoDB")

const app = express();

const PORT = 3000;

app.use(logger("dev"))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)
    connectToMongoDB()
})