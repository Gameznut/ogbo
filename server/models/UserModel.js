const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    }


});

module.exports = {
    User: mongoose.model('user', UserSchema)
};