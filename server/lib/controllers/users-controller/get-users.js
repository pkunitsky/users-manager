const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res) => {
  User
    .find({})
    .then(users => {
      res.json({users})
    })
    .catch(err => {
      res.status(500).send({ error: err.toString() })
    })
}
