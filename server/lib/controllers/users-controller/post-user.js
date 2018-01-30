const fs = require('fs')
const mongoose = require('mongoose')
const User = mongoose.model('User')

/* work here */

module.exports = (req, res) => {
  // const newUser = new User(req.body.user)
  const {file} = req.body

  const rs = fs.createReadStream(file.path)
  

  rs.pipe(ws)

  fs.unlink(file.path, (err) => {
    console.log(err.toString())
  })

  // const rs = fs.createReadStream()

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
