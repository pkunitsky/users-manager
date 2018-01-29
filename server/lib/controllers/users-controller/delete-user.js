const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res) => {
  const {userID} = req.params
  User.remove({_id: userID}, (err) => {
    if (err) {
      res.status(500).send({
        error: 'Unable to delete user'
      })
      return
    }

    res.json({
      msg: 'User was deleted'
    })
  })
}
