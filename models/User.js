const mongoose = require('mongoose')

const User = mongoose.model('User',{
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = User