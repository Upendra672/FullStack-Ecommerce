const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')

const errorMiddleware = require("./middleware/error") 


// Middleware to parse incoming JSON data
app.use(express.json())
app.use(cookieParser())

//routes import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use("/api/v1",product)
app.use("/api/v1",user)


//middleware for error
app.use(errorMiddleware)



module.exports = app;