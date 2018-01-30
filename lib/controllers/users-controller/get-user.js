const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res) => {
  const {userID} = req.params

  User.findById(userID, (err, user) => {
    if (err) {
      res.status(500).send({
        error: err.toString()
      })
      return
    }

    res.json({user})
  })
}
