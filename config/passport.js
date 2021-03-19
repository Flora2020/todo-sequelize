const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, { type: 'warning_msg', message: `${email} is not registered!` })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { type: 'warning_msg', message: 'Email or Password incorrect.' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['name', 'email']
  }, (accessToken, refreshToken, profile, done) => {
    const name = profile._json.first_name
    const email = profile._json.email

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) { return done(null, user) }
        const password = Math.random().toString(36).slice(-8)
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        User.create({
          name,
          email,
          password: hash
        })
          .then(user => {
            return done(null, user)
          })
          .catch(err => done(err, false))
      })
  }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        user = user.toJSON()
        done(null, user)
      }).catch(err => done(err, null))
  })
}
