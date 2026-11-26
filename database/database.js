const mongoose = require('mongoose')
require('dotenv').config()


const URL = process.env.MONGODB_URI

mongoose.connect(URL)
.then(()=>{
    console.log('Successfully Connected to Database')
}).catch((error)=>{
    console.log('Fail to connect to database', error.message)
})