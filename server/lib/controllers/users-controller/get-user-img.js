const mongoose = require('mongoose')
const User = mongoose.model('User')
const defaultBase64 = require('../../utils/default-base64')

function sendDefaultImg (res) {
  res.writeHead(200, {
    'Content-Type': 'image/jpeg'
  })
  res.end(defaultBase64)
}

function sendImgBinary (res, {contentType, data}) {
  res.writeHead(200, {
    'Content-Type': contentType
  })
  res.end(data, 'binary')
}

module.exports = (req, res) => {
  const {userID} = req.params
  User
    .findById(userID)
    .select({
      img: true
    })
    .then(user => {
      if (!user.img) {
        sendDefaultImg(res)
        return
      }

      const {contentType, data} = user.img
      sendImgBinary(res, { contentType, data })
    })
    .catch(err => {
      console.log(err.toString())
      sendDefaultImg(res)
    })
  }
