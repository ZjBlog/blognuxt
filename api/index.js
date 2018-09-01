const express = require('express')
const router = express.Router()
// Create express instnace
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})
// Add POST - /api/login
router.post('/login', (req, res) => {
  console.info(req.body)
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})
// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
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
