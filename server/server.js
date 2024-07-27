const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//connecting to the database
const DB = mongoose.connect('mongodb+srv://musariaz520:yAxGBr5afg3k87Ds@cluster0.odj6kte.mongodb.net/clinico/?retryWrites=true&w=majority&appName=Cluster0')
.then(() =>{
    console.log('Connected to the Database');
})

//rest object
const app = express();

//middlewares
app.use(morgan('dev')); // log requests to the console
app.use(express.json()); // parse JSON bodies
app.use(express.static('public')); // serve static files from the public folder


//routes
app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Welcome to the server'
    })
})

app.listen(process.env.PORT || 4500, ()=>{
    console.log('Server is running on port 4500');
})