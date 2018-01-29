const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = {
  getAll (req, res) {
    User
      .find({})
      .then(users => {
        res.json({users})
      })
      .catch(err => {
        res.send({ error: err.toString() })
      })
  },

  postOne (req, res) {
    const newUser = new User(req.body.user)

    /* test */
    console.dir(req.body.user.file)
    res.send({ success: 'alright boye', user: newUser })
    return
    /* test */

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
  },

  getOne (req, res) {
    User.findById(req.params.userID, (err, user) => {
      if (err) {
        res.status(500).send({
          error: err.toString()
        })
        return
      }

      res.json({user})
    })
  },

  putOne (req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userID},
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
  },

  deleteOne (req, res) {
    User.remove({_id: req.params.userID}, (err) => {
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
}
