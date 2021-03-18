const express = require('express')
const db = require('../../models')

const router = express.Router()
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name } = req.body
  const UserId = req.user.id
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      if (!todo) {
        console.log('todo not found.')
        return res.redirect('/')
      }
      res.render('detail', { todo: todo.toJSON() })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  const { name, isDone } = req.body

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      if (!todo) {
        console.log('todo not found.')
        return res.redirect('/')
      }
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.updatedAt = new Date()
      return todo.save()
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      todo.destroy()
      return res.redirect('/')
    })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      if (!todo) {
        console.log('todo not found.')
        return res.redirect('/')
      }
      res.render('edit', { todo: todo.toJSON() })
    })
    .catch(error => console.log(error))
})

module.exports = router
