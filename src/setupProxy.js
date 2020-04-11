const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/user', {
        target: 'http://127.0.0.1:9093',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/user': '/user'
        }
    })
  )
}