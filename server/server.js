const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const models = require('./model')
const Chat = models.getModel('chat')
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
    console.log('user login')
    socket.on('sendmsg', function(data) {
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
            console.log(doc)
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)

server.listen(9093)
