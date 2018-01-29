const mongoose = require('mongoose')
const User = mongoose.model('User')

/* work here */

module.exports = (req, res) => {
  // const newUser = new User(req.body.user)

  console.log('post-user.js:', req.body.files)
  console.log('post-user.js:', typeof req.body.files)

  // new User({
  //   ...req.body.fields,

  // })

  // newUser.save((err, user) => {
  //   if (err) {
  //     res.status(500).send({
  //       error: 'Cannot post user'
  //     })
  //     return
  //   }

  //   res.status(201).json({
  //     msg: 'User successfully added',
  //     user
  //   })
  // })
  
}
