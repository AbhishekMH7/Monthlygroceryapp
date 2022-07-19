const mongoose = require('mongoose')

const ItemSchemas = new mongoose.Schema({
    item : String,
    isPurchased :  Boolean
})

const Item = mongoose.model('item',ItemSchemas)

module.exports  =  Item