const express = require('express')

const { authenticator } = require('../middlewares/authenticate.js')
const users = require('./modules/users.js')
const todos = require('./modules/todos.js')
const home = require('./modules/home.js')
const auth = require('./modules/auth.js')

const router = express.Router()

router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
