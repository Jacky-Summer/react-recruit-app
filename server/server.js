const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)

app.listen(9093)
