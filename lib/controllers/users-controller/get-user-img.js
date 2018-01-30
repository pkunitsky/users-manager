const mongoose = require('mongoose')
const User = mongoose.model('User')
const defaultProfileImg = require('../../utils/default-profile-img')

function sendDefaultImg (res) {
  res.writeHead(200, {
    'Content-Type': 'image/jpeg'
  })
  res.end(defaultProfileImg)
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
      sendDefaultImg(res)
    })
  }
