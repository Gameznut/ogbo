const mongoose = require('mongoose');
const {
    MONGODBURI,
    PORT
} = require('../config/config')

mongoose.connect(MONGODBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected to db');
    })
    .catch((error) => {
        console.log(error.message);
    })