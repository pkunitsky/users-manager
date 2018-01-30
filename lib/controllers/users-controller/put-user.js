const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res) => {
  const {userID} = req.params

  User.findOneAndUpdate(
    {_id: userID},
    req.body.user,
    {new: true},
    (err, user) => {
      if (err) {
        res.send({
          error: err.toString()
        })
        return
      }

      res.json({user})
    }
  )
}
