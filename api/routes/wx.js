const { Router } = require('express')

const router = Router()

/* GET wx listing. */
router.get('/', function (req, res, next) {
  res.json({username: 'zj'})
})
module.exports = router
