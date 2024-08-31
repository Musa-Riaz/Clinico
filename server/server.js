const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const cors = require('cors');
const path = require('path');

//configuring the environment variables
dotenv.config();

//connecting to the database
const DB = mongoose.connect(process.env.MONGO_DB_URL)
.then(() =>{
    console.log('Connected to the Database');
})

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev')); // log requests to the console
app.use(express.json()); // parse JSON bodies
app.use(express.static(path.join(__dirname, "./client/build"))); // serve static files from the public folder


app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/doctor', doctorRoutes);


app.listen(process.env.PORT || 4500, ()=>{
    console.log('Server is running on port 4500');
})