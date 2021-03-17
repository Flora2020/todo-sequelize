function authenticator(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log('Please login to continue.')
    return res.redirect('/users/login')
  }
  return next()
}

module.exports = {
  authenticator
}
