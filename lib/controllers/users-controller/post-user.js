const fs = require('fs')
const stream = require('stream')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const PDF = require('../../utils/pdf-class')

module.exports = (req, res) => {
  const { file, fields } = req.body
  const { firstName, lastName, job, about } = fields

  const arrOfBuff = []

  // "formidable" module created temporary file. placed at os.tmpdir() by default
  const rs = fs.createReadStream(file.path)
  rs.on('data', miniBuff => {
    arrOfBuff.push(miniBuff)
  })

  rs.on('end', async () => {
    // imgBuff is total of all received buffer chunks
    const imgBuff = Buffer.concat(arrOfBuff)

    // deleting temporary file placed at os.tmpdir(), as we have all data in imgBuff
    fs.unlink(file.path, err => {
      if (err) console.log(err.toString())
    })

    const pdf = new PDF({
      fullName: firstName + ' ' + lastName,
      imgBuff,
      about,
      job
    })

    pdf
      .init()
      .then(pdfBuff => {
        // creating new User instance
        const newUser = new User({
          firstName,
          lastName,
          job,
          about,
          img: {
            data: imgBuff,
            contentType: file.type
          },
          pdf: {
            data: pdfBuff,
            contentType: 'application/pdf'
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
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              job: user.job
            }
          })
        })
      })
      .catch(err => console.log(err.toString()))
  })
}
