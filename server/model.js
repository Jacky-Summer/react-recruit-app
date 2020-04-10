const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/recruit', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', err => {
    console.log('连接成功')
})