const mongoose = require('mongoose')
const User = mongoose.model('User')

const Grid = require('gridfs-stream')
const gfs = new Grid(mongoose.connection.db)
Grid.mongo = mongoose.mongo

module.exports = (req, res) => {
  const newUser = new User(req.body.user)

  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({
        error: 'Cannot post user'
      })
      return
    }

    res.status(201).json({
      msg: 'User successfully added',
      user
    })
  })
  
}
