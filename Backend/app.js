const express = require('express');
const app = express();

const errorMiddleware = require("./middleware/error") 


// Middleware to parse incoming JSON data
app.use(express.json())

//routes import
const product = require('./routes/productRoute');
app.use("/api/v1",product)


//middleware for error
app.use(errorMiddleware)



module.exports = app;