const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const _filter = { 'pwd': 0, '__v': 0 }

Router.get('/list', (req, res) => {
    User.find({}, (err, doc) => {
        return res.json(doc)
    })
})

Router.post('/login', (req, res) => {
    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
        if (!doc) {
			return res.json({ code:1,msg:'用户名或者密码错误' })
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
        const userModel = new User({ user, pwd, type })
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
    console.log(req)
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userId }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

function md5Pwd (pwd) {
    const salt = 'complicated_pwd_3957x8yza6!@#IUHJh~~'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router