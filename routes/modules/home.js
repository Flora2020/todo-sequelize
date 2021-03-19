const express = require('express')
const db = require('../../models')

const router = express.Router()
const Todo = db.Todo

router.get('/', (req, res) => {
  const UserId = req.user.id
  const error = []
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId }
  })
    .then((todos) => {
      if (todos.length < 1) { error.push('Congratulations! Your todo list is empty!') }
      return res.render('index', { todos, error })
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
