const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost:27017/GroceryApp',{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    versionKey: false
    
}, err => {
    if(err) console.log(`Error in Db Connection ${err}`)
    console.log(`MongoDB Connection Succeeded..`)
})