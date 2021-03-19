function authenticator (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('warning_msg', 'Please login to continue.')
    return res.redirect('/users/login')
  }
  return next()
}

module.exports = {
  authenticator
}
