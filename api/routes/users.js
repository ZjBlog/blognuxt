const { Router } = require('express')
const hash = require('object-hash')
const router = Router()
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

module.exports = router
