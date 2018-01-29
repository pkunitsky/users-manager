const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res) => {
  User
    .find({})
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.status(500).send({ error: err.toString() })
    })
}
