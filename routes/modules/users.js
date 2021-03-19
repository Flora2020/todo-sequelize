const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')

const router = express.Router()
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const error = []

  if (!name || !email || !password || !confirmPassword) {
    error.push('Please fill in all input columns.')
  }

  if (password !== confirmPassword) {
    error.push('Your password and confirmation password do not match.')
  }

  if (error.length > 0) {
    return res.render('register', { name, email, password, confirmPassword, error })
  }

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      error.push(`${email} is already registered.`)
      return res.render('register', {
        name,
        password,
        confirmPassword,
        error
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/users/login'))
      .catch(err => {
        console.log(err)
        return res.render('error')
      })
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out.')
  res.redirect('/users/login')
})

module.exports = router
