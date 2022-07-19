const express = require('express')
const cors = require('cors')
const router = require('./routes/routes.js')


const app = express()
require('./models/db.js')
app.use('/api/tasks', router)

app.use(express.json())
app.use(cors())


app.listen('8000' , err => {
    if(err) console.log(err)
    console.log('Server is started at port 8000')
})