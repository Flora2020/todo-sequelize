const express = require('express')

const users = require('./modules/users.js')
const todos = require('./modules/todos.js')
const home = require('./modules/home.js')

const router = express.Router()

router.use('/users', users)
router.use('/todos', todos)
router.use('/', home)

module.exports = router
