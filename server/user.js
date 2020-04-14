const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const _filter = { 'pwd': 0, '__v': 0 }
// Chat.remove({}, function(err,doc) {

// })
Router.get('/list', (req, res) => {
    const { type } = req.query
    User.find({ type }, _filter, (err, doc) => {
        if (!err) {
            return res.json({ code: 0, data: doc })
        }
    })
})

Router.post('/login', (req, res) => {
    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
        if (!doc) {
			return res.json({ code: 1, msg: '用户名或者密码错误' })
        }
        res.cookie('userId', doc._id)
        return res.json({ code: 0, data: doc })
    })
})

Router.post('/register', (req, res) => {
    const { user, pwd, type } = req.body
    User.findOne({ user }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复'})
        }
        const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
        userModel.save((err, doc) => {
            if (err) {
                return res.json({ code: 1, 'msg': '后端出错了' })
            }
            const { user, type, _id } = doc
            res.cookie('userId', _id)
            return res.json({ code: 0, data: { user, type, _id } })
        })
    })
})

Router.get('/info', (req, res) => {
    // 检测用户有没有cookie
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userId }, _filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

Router.post('/update', (req, res) => {
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 1 })
    }
    const body = req.body
    User.findByIdAndUpdate(userId, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data })
    })
})

Router.get('/getmsglist', (req, res) => {
    const user = req.cookies.userId
    User.find({}, _filter, function(e, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        })
        Chat.find({ '$or': [{ from: user }, { to: user }] }, (err, doc) => {
            if (!err) {
                return res.json({ code: 0, msgs: doc, users})
            }
        })
    })
})

function md5Pwd (pwd) {
    const salt = 'complicated_pwd_3957x8yza6!@#IUHJh~~'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router