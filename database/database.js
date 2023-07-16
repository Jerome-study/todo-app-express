const mongoose = require('mongoose');

// Environment Variables


const connectionString = process.env.MONGODBURL;
mongoose.connect(connectionString).then(() => {
    console.log('Connected to database');
}).catch( error => {
    console.log(error);
});