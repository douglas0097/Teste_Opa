const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    amount: Number,
    price: Number,
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Category',
    }]
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product