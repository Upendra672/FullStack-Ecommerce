const express = require('express');

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json())

//routes import

const product = require('./routes/productRoute');

app.use("/api/v1",product)


module.exports = app;