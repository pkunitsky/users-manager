const fs = require('fs')
const stream = require('stream')
const mongoose = require('mongoose')
const User = mongoose.model('User')


module.exports = (req, res) => {
  const {file, fields} = req.body

  const arrOfBuff = []
  
  const rs = fs.createReadStream(file.path)
  rs.on('data', miniBuff => {
    arrOfBuff.push(miniBuff)
  })

  rs.on('end', _ => {
    // bigBuff is total of all received buffer chunks
    const bigBuff = Buffer.concat(arrOfBuff)

    // deleting temporary file created by "formidable" module
    fs.unlink(file.path, (err) => {
      if (err) console.log(err.toString())
    })

    // creating user instance
    const newUser = new User({
      firstName: fields.firstName,
      lastName: fields.lastName,
      job: fields.job,
      about: fields.about,
      img: {
        data: bigBuff,
        contentType: file.type
      }
    })

    // saving to database
    newUser.save((err, user) => {
      if (err) {
        // handling error
        res.status(500).send({
          error: 'Cannot post user'
        })
        return
      }
  
      res.status(201).json({
        success: 'User successfully added',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          job: user.job
        }
      })
    })
  })
}
