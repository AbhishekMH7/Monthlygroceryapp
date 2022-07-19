const express = require('express')
const Item = require('../models/models.js')

const router = express.Router()

// router.get('/additem', (req, res) => {
    
// })

router.get('/', (req,res) => {
   Item.find((err,doc) => {
     if(err) console.log(err)
     res.json(doc)
   })
})

router.post('/',(req,res) => {
    const item = new Item (req.body)
    item.save((err,doc) => {
        if(err) console.log(err)
        res.json(doc)
    })
})

router.put('/:id',(req,res) => {
    Item.findOneAndUpdate({
        _id : req.params.id
    },req.body,{
        new : true
    }, (err,doc) => {
       if(err) console.log(err)
       res.json(doc)
    })
})

router.delete('/:id', (req,res) =>{
    Item.findByIdAndDelete(req.params.id, (err,doc) =>{
        if(err) console.log(err)
        res.json(doc)
    })
})

module.exports = router