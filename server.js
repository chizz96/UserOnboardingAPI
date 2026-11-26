const express = require('express')
require('dotenv').config()
require('./database/database')

const userAuthRoutes = require('./routes/userAuthRoutes')

const userProfileRoutes = require('./routes/userProfileRoutes')

const app = express()

app.use(express.json())
app.use(userAuthRoutes)
app.use(userProfileRoutes)


const port = process.env.PORT


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})


