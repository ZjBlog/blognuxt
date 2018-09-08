const express = require('express')
const router = express.Router()
// Create express instnace
const app = express()
const hash = require('object-hash')
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})
// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'zj' && req.body.password === hash.MD5('admin')) {
    req.myBlog.authUser = 'ZJ'
    return res.json({ username: 'ZJ' })
  }
  res.status(401).json({ message: '账号或密码错误,请重试!' })
})
// Add POST - /api/logout
router.post('/logout', (req, res) => {
  req.myBlog.authUser = ''
  res.json({ ok: true })
})
// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use(users)
app.use(router)
// Export the server middleware
module.exports = {
  path: '/user',
  handler: app
}
