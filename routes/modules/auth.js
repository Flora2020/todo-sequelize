const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/facebook',
  passport.authenticate('facebook', { scope: 'public_profile,email' }))

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

module.exports = router
