const express = require('express')
const app = express()
// Require API routes
const users = require('./routes/users')
const wx = require('./routes/wx')
app.use('/user', users)
app.use('/wx', wx)
// Export the server middleware
module.exports = {
  handler: app
}
