const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', err => {
    console.log('连接成功')
})

const UserModel = mongoose.model('User', new mongoose.Schema({ 
    user: { type: String, require: true },
    age: { type: Number, require: true }
}));
// 添加数据
// UserModel.create({
//     name: 'jacky',
//     age: 20
// }, (err, doc) => {
//     if (!err) {
//         console.log(doc)
//     }
// })
app.get('/', (req, res) => {
    res.send('test')
})
app.get('/data', (req, res) => {
    UserModel.find({}, (err, doc) => {
        res.json(doc)
    })
})
app.get('/update', (req, res) => {
    UserModel.update({ age: 20 }, {'$set': { age: 30 }}, (err, doc) => {
        res.json(doc)
    })
})
app.get('/remove', (req, res) => {
    UserModel.remove({ age: 22 }, (err, doc) => {
        res.json(doc)
    })
})
app.listen(3000)
