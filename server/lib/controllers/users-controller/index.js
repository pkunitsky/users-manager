const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = {
  deleteUser: require('./delete-user'),
  getUserPdf: require('./get-user-pdf'),
  getUser: require('./get-user'),
  getUsers: require('./get-users'),
  postUser: require('./post-user'),
  putUser: require('./put-user')
}
